'use client';

import { useState, useRef, useCallback } from 'react';
import { Send, Paperclip, X, Globe, Image as ImageIcon, FileText } from 'lucide-react';
import { Attachment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ChatInputProps {
  onSendMessage: (content: string, attachments: Attachment[], useSearch: boolean) => void;
  isStreaming: boolean;
}

export function ChatInput({ onSendMessage, isStreaming }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [useSearch, setUseSearch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isStreaming) return;
    
    onSendMessage(input.trim(), attachments, useSearch);
    setInput('');
    setAttachments([]);
  }, [input, attachments, useSearch, isStreaming, onSendMessage]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        const isImage = file.type.startsWith('image/');
        
        const attachment: Attachment = {
          id: uuidv4(),
          type: isImage ? 'image' : 'file',
          name: file.name,
          dataUrl,
          mimeType: file.type,
        };
        
        setAttachments(prev => [...prev, attachment]);
      };
      reader.readAsDataURL(file);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  }, []);

  return (
    <div className="border-t border-gray-800 bg-gray-900 p-4">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 max-w-4xl mx-auto">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2"
            >
              {attachment.type === 'image' ? (
                <ImageIcon className="w-4 h-4 text-blue-400" />
              ) : (
                <FileText className="w-4 h-4 text-green-400" />
              )}
              <span className="text-sm text-gray-300 truncate max-w-[150px]">
                {attachment.name}
              </span>
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 bg-gray-800 border border-gray-700 rounded-xl p-3">
          {/* File upload button */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.txt,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
            title="Attach files"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Text input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Message Roli..."
            rows={1}
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 resize-none outline-none max-h-32 py-2"
            style={{ minHeight: '24px' }}
          />

          {/* Search toggle */}
          <button
            type="button"
            onClick={() => setUseSearch(!useSearch)}
            className={`p-2 rounded-lg transition-colors ${
              useSearch 
                ? 'text-blue-400 bg-blue-400/10' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
            }`}
            title="Enable web search"
          >
            <Globe className="w-5 h-5" />
          </button>

          {/* Send button */}
          <button
            type="submit"
            disabled={(!input.trim() && attachments.length === 0) || isStreaming}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-2 text-xs text-gray-500">
          Press Enter to send, Shift+Enter for new line
          {useSearch && ' • Web search enabled'}
        </div>
      </form>
    </div>
  );
}
