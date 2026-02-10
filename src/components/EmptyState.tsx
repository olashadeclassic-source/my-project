'use client';

import { MessageSquare, Search, Image as ImageIcon, Pin } from 'lucide-react';

interface EmptyStateProps {
  onStartChat: () => void;
}

export function EmptyState({ onStartChat }: EmptyStateProps) {
  const suggestions = [
    'Explain quantum computing in simple terms',
    'Write a Python function to sort a list',
    'Help me debug my React code',
    'Summarize the latest AI developments',
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-900">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Roli</h1>
        <p className="text-gray-400 text-lg mb-8">
          Your AI assistant with web search, file uploads, and multi-chat history.
        </p>

        <button
          onClick={onStartChat}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors mb-12"
        >
          Start a new chat
        </button>

        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <Search className="w-6 h-6 text-blue-400 mb-2" />
            <h3 className="text-white font-medium mb-1">Web Search</h3>
            <p className="text-gray-400 text-sm">Search the web for real-time information</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <ImageIcon className="w-6 h-6 text-green-400 mb-2" />
            <h3 className="text-white font-medium mb-1">File Uploads</h3>
            <p className="text-gray-400 text-sm">Upload images and documents to analyze</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <MessageSquare className="w-6 h-6 text-purple-400 mb-2" />
            <h3 className="text-white font-medium mb-1">Multi-Chat</h3>
            <p className="text-gray-400 text-sm">Keep multiple conversations organized</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-left">
            <Pin className="w-6 h-6 text-yellow-400 mb-2" />
            <h3 className="text-white font-medium mb-1">Pinned Threads</h3>
            <p className="text-gray-400 text-sm">Pin important conversations for quick access</p>
          </div>
        </div>

        <div className="text-left">
          <h3 className="text-gray-300 font-medium mb-3">Try asking:</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onStartChat()}
                className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
