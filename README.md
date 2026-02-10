# Roli - AI Chat Application

Roli is a Next.js App Router application featuring streaming chat powered by Google's Gemini AI, with multi-chat history, pinned threads stored in localStorage, file/image uploads, and Jina AI web search/grounding.

## Features

- **Streaming Chat**: Real-time streaming responses from Gemini AI
- **Multi-Chat History**: Keep multiple conversation threads organized
- **Pinned Threads**: Pin important conversations for quick access
- **Local Storage**: All chat history is stored locally in your browser
- **File Uploads**: Upload images and documents to analyze with the AI
- **Web Search**: Enable web search to get real-time information using Jina AI
- **No Authentication**: Start chatting immediately without signing up

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Google Generative AI (Gemini)
- Jina AI (s.jina.ai for search, r.jina.ai for reading)

## Getting Started

### Prerequisites

- Node.js 18+
- A Google AI Studio API key (get one at https://aistudio.google.com/app/apikey)
- A Jina AI API key (get one at https://jina.ai/api) - required for web search functionality

### Installation

1. Navigate to the project directory:
```bash
cd roli-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and add your API keys:
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
JINA_API_KEY=your_actual_jina_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/roli)

1. Push the repository to GitHub or GitLab.
2. Import the project into Vercel.
3. Add the environment variables in Vercel:
   - `GEMINI_API_KEY`
   - `JINA_API_KEY`
4. Deploy and verify the streaming chat and web search work as expected.

For a full walkthrough (including Vercel CLI steps, troubleshooting, and custom domains), see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Usage

### Starting a Chat
- Click "New Chat" in the sidebar to start a fresh conversation
- Or select an existing chat from the history

### Managing Chats
- **Pin a chat**: Click the three dots menu on a chat and select "Pin"
- **Rename a chat**: Click the three dots menu and select "Rename"
- **Delete a chat**: Click the three dots menu and select "Delete"

### Using Features

#### Web Search
- Click the globe icon in the chat input to enable web search
- When enabled, the AI will search the web for relevant information before responding

#### File Uploads
- Click the paperclip icon in the chat input to upload files
- Supports images and documents
- Uploaded files are shown as attachments with your message

## API Routes

### `/api/chat`
Handles streaming chat responses from Gemini AI.

**Method**: POST

**Body**:
```json
{
  "messages": [...],
  "useSearch": boolean
}
```

### `/api/search`
Handles web search using Jina AI.

**Method**: GET

**Query Parameters**:
- `q`: Search query string

**Method**: POST

**Body**:
```json
{
  "url": "URL to read"
}
```

## Development

### Project Structure
```
roli-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.ts      # Chat streaming API
│   │   │   └── search/
│   │   │       └── route.ts      # Search API
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx              # Main chat interface
│   ├── components/
│   │   ├── ChatInput.tsx         # Message input with file upload
│   │   ├── ChatMessage.tsx       # Message display component
│   │   ├── EmptyState.tsx        # Empty state / welcome screen
│   │   └── Sidebar.tsx           # Chat list sidebar
│   ├── hooks/
│   │   ├── useChat.ts            # Chat logic hook
│   │   └── useLocalStorage.ts    # localStorage hook
│   ├── lib/
│   └── types/
│       └── index.ts              # TypeScript types
├── .env.local.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## License

MIT
