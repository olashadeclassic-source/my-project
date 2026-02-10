'use client';

import { useState, useCallback, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { EmptyState } from '@/components/EmptyState';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useChat } from '@/hooks/useChat';
import { ChatThread, Attachment } from '@/types';

export default function Home() {
  const [threads, setThreads] = useLocalStorage<ChatThread[]>('roli-threads', []);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  const handleSendMessageWithThread = useCallback(async (
    content: string, 
    attachments: Attachment[], 
    useSearch: boolean
  ) => {
    // Create a new thread if none exists
    if (!currentThreadId) {
      createThread();
    }
    // Small delay to ensure thread is created before sending
    setTimeout(() => {
      sendMessage(content, attachments, useSearch);
    }, 0);
  }, [currentThreadId, createThread, sendMessage]);

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar
        threads={threads}
        currentThreadId={currentThreadId}
        onSelectThread={(id) => {
          setCurrentThreadId(id);
          setIsSidebarOpen(false);
        }}
        onCreateThread={() => {
          handleCreateThread();
          setIsSidebarOpen(false);
        }}
        onDeleteThread={deleteThread}
        onTogglePin={togglePinThread}
        onRenameThread={renameThread}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          aria-label="Close sidebar"
        />
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 md:hidden">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-gray-200">Roli Chat</span>
        </div>
        {currentThread ? (
          <>
            <div className="flex-1 overflow-y-auto">
              {currentThread.messages.length === 0 ? (
                <EmptyState 
                  onStartChat={() => {}} 
                  onSendMessage={(msg) => sendMessage(msg, [], false)}
                />
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
              onSendMessage={handleSendMessageWithThread}
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
