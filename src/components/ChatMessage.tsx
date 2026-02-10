'use client';

import { Message } from '@/types';
import { User, Bot, FileText, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  streamedContent?: string;
}

export function ChatMessage({ message, isStreaming, streamedContent }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const displayContent = isStreaming && streamedContent ? streamedContent : message.content;

  return (
    <div className={`py-6 ${isUser ? 'bg-gray-800/50' : 'bg-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex gap-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-blue-600' : 'bg-green-600'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-gray-200">
                {isUser ? 'You' : 'Roli'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
              {message.searchResults && message.searchResults.length > 0 && (
                <span className="flex items-center gap-1 text-xs text-blue-400">
                  <Globe className="w-3 h-3" />
                  Web search used
                </span>
              )}
            </div>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg p-2"
                  >
                    {attachment.type === 'image' ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={attachment.dataUrl}
                          alt={attachment.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300 truncate max-w-[150px]">
                          {attachment.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Message content */}
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {displayContent}
              </ReactMarkdown>
            </div>

            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
