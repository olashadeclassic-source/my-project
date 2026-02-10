import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, Attachment } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { messages, useSearch } = await req.json();

    // Build conversation history for Gemini
    const history = messages.map((msg: Message) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // If search is enabled, perform search first
    let searchContext = '';
    if (useSearch && messages.length > 0) {
      const lastUserMessage = messages.filter((m: Message) => m.role === 'user').pop();
      if (lastUserMessage) {
        try {
          const searchResponse = await fetch(
            `https://s.jina.ai/${encodeURIComponent(lastUserMessage.content)}`
          );
          if (searchResponse.ok) {
            searchContext = await searchResponse.text();
          }
        } catch (error) {
          console.error('Search error:', error);
        }
      }
    }

    // Prepare the model
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    // Start chat with history
    const chat = model.startChat({
      history: history.slice(0, -1),
    });

    // Get the last message content
    const lastMessage = messages[messages.length - 1];
    let prompt = lastMessage.content;

    // Add attachments context if present
    if (lastMessage.attachments && lastMessage.attachments.length > 0) {
      const attachmentContext = lastMessage.attachments
        .map((att: Attachment) => `[Attachment: ${att.name} (${att.type})]`)
        .join('\n');
      prompt = `${prompt}\n\nAttachments:\n${attachmentContext}`;
    }

    // Add search context if available
    if (searchContext) {
      prompt = `Context from web search:\n${searchContext}\n\nUser question: ${prompt}\n\nPlease answer based on the context above and your knowledge.`;
    }

    // Create streaming response
    const result = await chat.sendMessageStream(prompt);

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
