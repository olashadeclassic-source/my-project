'use client';

import { ChatThread } from '@/types';
import { 
  Plus, 
  Trash2, 
  Pin, 
  MessageSquare, 
  MoreVertical,
  Edit2,
  Check,
  X
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SidebarProps {
  threads: ChatThread[];
  currentThreadId: string | null;
  onSelectThread: (id: string) => void;
  onCreateThread: () => void;
  onDeleteThread: (id: string) => void;
  onTogglePin: (id: string) => void;
  onRenameThread: (id: string, title: string) => void;
}

export function Sidebar({
  threads,
  currentThreadId,
  onSelectThread,
  onCreateThread,
  onDeleteThread,
  onTogglePin,
  onRenameThread,
}: SidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sort threads: pinned first, then by updatedAt
  const sortedThreads = [...threads].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt - a.updatedAt;
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpenId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStartEdit = (thread: ChatThread) => {
    setEditingId(thread.id);
    setEditTitle(thread.title);
    setMenuOpenId(null);
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      onRenameThread(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <div className="w-64 h-full bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      <div className="p-4 border-b border-gray-800">
        <button
          onClick={onCreateThread}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {sortedThreads.length === 0 ? (
          <div className="text-gray-500 text-center py-8 text-sm">
            No chats yet. Start a new conversation!
          </div>
        ) : (
          sortedThreads.map((thread) => (
            <div
              key={thread.id}
              className={`group relative flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                currentThreadId === thread.id
                  ? 'bg-gray-800 text-white'
                  : 'hover:bg-gray-800/50 text-gray-300'
              }`}
              onClick={() => onSelectThread(thread.id)}
            >
              {thread.pinned && (
                <Pin className="w-3 h-3 text-yellow-500 flex-shrink-0" />
              )}
              
              {editingId === thread.id ? (
                <div className="flex-1 flex items-center gap-1">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit();
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-gray-700 text-white text-sm px-2 py-1 rounded outline-none"
                    autoFocus
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveEdit();
                    }}
                    className="p-1 hover:bg-gray-600 rounded"
                  >
                    <Check className="w-3 h-3 text-green-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelEdit();
                    }}
                    className="p-1 hover:bg-gray-600 rounded"
                  >
                    <X className="w-3 h-3 text-red-400" />
                  </button>
                </div>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1 truncate text-sm">{thread.title}</span>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpenId(menuOpenId === thread.id ? null : thread.id);
                      }}
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}

              {menuOpenId === thread.id && editingId !== thread.id && (
                <div
                  ref={menuRef}
                  className="absolute right-2 top-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[120px]"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTogglePin(thread.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-700 text-left"
                  >
                    <Pin className={`w-3 h-3 ${thread.pinned ? 'text-yellow-500' : ''}`} />
                    {thread.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEdit(thread);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-700 text-left"
                  >
                    <Edit2 className="w-3 h-3" />
                    Rename
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteThread(thread.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-700 text-left text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          Roli Chat
        </div>
      </div>
    </div>
  );
}
