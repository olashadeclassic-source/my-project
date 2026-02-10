export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  attachments?: Attachment[];
  searchResults?: SearchResult[];
}

export interface Attachment {
  id: string;
  type: 'image' | 'file';
  name: string;
  dataUrl: string;
  mimeType: string;
}

export interface SearchResult {
  title: string;
  url: string;
  content: string;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}

export interface ChatState {
  threads: ChatThread[];
  currentThreadId: string | null;
}
