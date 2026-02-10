import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Helper to convert data URL to base64
function dataUrlToBase64(dataUrl: string): { base64: string; mimeType: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid data URL');
  }
  return { mimeType: match[1], base64: match[2] };
}

export async function POST(req: NextRequest) {
  try {
    const { messages, useSearch } = await req.json();

    // If search is enabled, perform search first
    let searchContext = '';
    if (useSearch && messages.length > 0) {
      const lastUserMessage = messages.filter((m: Message) => m.role === 'user').pop();
      if (lastUserMessage) {
        try {
          const apiKey = process.env.JINA_API_KEY;
          if (!apiKey) {
            console.error('JINA_API_KEY is not configured for search');
          } else {
            const searchResponse = await fetch(
              `https://s.jina.ai/?q=${encodeURIComponent(lastUserMessage.content)}`,
              {
                headers: {
                  'Accept': 'text/plain',
                  'Authorization': `Bearer ${apiKey}`,
                  'X-Token-Budget': '2000',
                  'X-Engine': 'direct',
                  'X-No-Cache': 'true',
                },
              }
            );
            if (searchResponse.ok) {
              searchContext = await searchResponse.text();
            } else {
              console.error('Search API error:', searchResponse.status);
            }
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      }
    }

    // Prepare the model - using gemma-3-4b-it
    const model = genAI.getGenerativeModel({
      model: 'gemma-3-4b-it',
    });

    // Get the last message
    const lastMessage = messages[messages.length - 1];

    // Prepare content parts
    const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [];

    // Add search context if available
    let textPrompt = lastMessage.content;
    if (searchContext) {
      textPrompt = `Context from web search:\n${searchContext}\n\nUser question: ${textPrompt}\n\nPlease answer based on the context above and your knowledge.`;
    }
    parts.push({ text: textPrompt });

    // Add image attachments inline for multimodal input
    if (lastMessage.attachments && lastMessage.attachments.length > 0) {
      for (const att of lastMessage.attachments) {
        if (att.type === 'image') {
          try {
            const { base64, mimeType } = dataUrlToBase64(att.dataUrl);
            parts.push({
              inlineData: {
                data: base64,
                mimeType: mimeType,
              },
            });
          } catch (e) {
            console.error('Failed to process image:', e);
          }
        }
      }
    }

    // Build conversation history (excluding the last message)
    const history = messages.slice(0, -1).map((msg: Message) => {
      const msgParts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [{ text: msg.content }];
      
      // Include images in history if present
      if (msg.attachments && msg.attachments.length > 0) {
        for (const att of msg.attachments) {
          if (att.type === 'image') {
            try {
              const { base64, mimeType } = dataUrlToBase64(att.dataUrl);
              msgParts.push({
                inlineData: {
                  data: base64,
                  mimeType: mimeType,
                },
              });
            } catch (e) {
              console.error('Failed to process image in history:', e);
            }
          }
        }
      }
      
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msgParts,
      };
    });

    // Start chat with history
    const chat = model.startChat({
      history: history,
    });

    // Create streaming response
    const result = await chat.sendMessageStream(parts);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              const data = `data: ${JSON.stringify({ content: text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
