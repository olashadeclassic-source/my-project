'use client';

import { useState, useCallback } from 'react';
import { ChatThread, Message, Attachment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function useChat(
  threads: ChatThread[],
  setThreads: React.Dispatch<React.SetStateAction<ChatThread[]>>,
  currentThreadId: string | null,
  setCurrentThreadId: (id: string | null) => void
) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');

  const createThread = useCallback(() => {
    const newThread: ChatThread = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      pinned: false,
    };
    setThreads(prev => [newThread, ...prev]);
    setCurrentThreadId(newThread.id);
    return newThread;
  }, [setThreads, setCurrentThreadId]);

  const deleteThread = useCallback((threadId: string) => {
    setThreads(prev => prev.filter(t => t.id !== threadId));
    if (currentThreadId === threadId) {
      const remaining = threads.filter(t => t.id !== threadId);
      setCurrentThreadId(remaining.length > 0 ? remaining[0].id : null);
    }
  }, [setThreads, currentThreadId, threads, setCurrentThreadId]);

  const togglePinThread = useCallback((threadId: string) => {
    setThreads(prev => prev.map(t => 
      t.id === threadId ? { ...t, pinned: !t.pinned } : t
    ));
  }, [setThreads]);

  const renameThread = useCallback((threadId: string, title: string) => {
    setThreads(prev => prev.map(t => 
      t.id === threadId ? { ...t, title } : t
    ));
  }, [setThreads]);

  const sendMessage = useCallback(async (
    content: string,
    attachments: Attachment[] = [],
    useSearch: boolean = false
  ) => {
    let threadId = currentThreadId;
    let currentMessages: Message[] = [];
    
    if (!threadId) {
      const newThread = createThread();
      threadId = newThread.id;
      currentMessages = [];
    } else {
      currentMessages = threads.find(t => t.id === threadId)?.messages || [];
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: Date.now(),
      attachments,
    };

    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        const updatedMessages = [...t.messages, userMessage];
        const title = t.messages.length === 0 
          ? content.slice(0, 50) + (content.length > 50 ? '...' : '')
          : t.title;
        return { ...t, messages: updatedMessages, title, updatedAt: Date.now() };
      }
      return t;
    }));

    setIsStreaming(true);
    setStreamedContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...currentMessages, userMessage],
          useSearch,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      let fullContent = '';
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                fullContent += parsed.content;
                setStreamedContent(fullContent);
              }
            } catch {
              // Ignore parse errors
            }
          }
        }
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'model',
        content: fullContent,
        timestamp: Date.now(),
      };

      setThreads(prev => prev.map(t => {
        if (t.id === threadId) {
          return { ...t, messages: [...t.messages, assistantMessage], updatedAt: Date.now() };
        }
        return t;
      }));

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now(),
      };
      setThreads(prev => prev.map(t => {
        if (t.id === threadId) {
          return { ...t, messages: [...t.messages, errorMessage], updatedAt: Date.now() };
        }
        return t;
      }));
    } finally {
      setIsStreaming(false);
      setStreamedContent('');
    }
  }, [currentThreadId, createThread, threads, setThreads]);

  const currentThread = threads.find(t => t.id === currentThreadId) || null;

  return {
    currentThread,
    isStreaming,
    streamedContent,
    createThread,
    deleteThread,
    togglePinThread,
    renameThread,
    sendMessage,
  };
}
