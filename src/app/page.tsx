'use client';

import { useState, useCallback } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { EmptyState } from '@/components/EmptyState';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useChat } from '@/hooks/useChat';
import { ChatThread } from '@/types';

export default function Home() {
  const [threads, setThreads] = useLocalStorage<ChatThread[]>('roli-threads', []);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);

  const {
    currentThread,
    isStreaming,
    streamedContent,
    createThread,
    deleteThread,
    togglePinThread,
    renameThread,
    sendMessage,
  } = useChat(threads, setThreads, currentThreadId, setCurrentThreadId);

  const handleCreateThread = useCallback(() => {
    createThread();
  }, [createThread]);

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar
        threads={threads}
        currentThreadId={currentThreadId}
        onSelectThread={setCurrentThreadId}
        onCreateThread={handleCreateThread}
        onDeleteThread={deleteThread}
        onTogglePin={togglePinThread}
        onRenameThread={renameThread}
      />

      <div className="flex-1 flex flex-col h-full">
        {currentThread ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {currentThread.messages.length === 0 ? (
                <EmptyState onStartChat={() => {}} />
              ) : (
                <div className="pb-4">
                  {currentThread.messages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isStreaming={
                        isStreaming &&
                        index === currentThread.messages.length - 1 &&
                        message.role === 'user'
                      }
                      streamedContent={streamedContent}
                    />
                  ))}
                  {isStreaming && (
                    <ChatMessage
                      message={{
                        id: 'streaming',
                        role: 'model',
                        content: streamedContent || '',
                        timestamp: Date.now(),
                      }}
                      isStreaming={true}
                      streamedContent={streamedContent}
                    />
                  )}
                </div>
              )}
            </div>
            <ChatInput
              onSendMessage={sendMessage}
              isStreaming={isStreaming}
            />
          </>
        ) : (
          <EmptyState onStartChat={handleCreateThread} />
        )}
      </div>
    </div>
  );
}
