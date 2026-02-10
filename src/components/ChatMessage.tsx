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
    <div className={`py-4 sm:py-6 ${isUser ? 'bg-gray-800/50' : 'bg-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        <div className="flex gap-3 sm:gap-4">
          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-blue-600' : 'bg-green-600'
          }`}>
            {isUser ? (
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            ) : (
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
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
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-3">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden ${
                      attachment.type === 'image' ? 'p-0' : 'p-2'
                    }`}
                  >
                    {attachment.type === 'image' ? (
                      <div className="relative group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={attachment.dataUrl}
                          alt={attachment.name}
                          className="max-w-[160px] max-h-[160px] sm:max-w-[200px] sm:max-h-[200px] object-contain rounded"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {attachment.name}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300 truncate max-w-[150px] sm:max-w-[180px]">
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
