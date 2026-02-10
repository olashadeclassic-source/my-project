import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Use Jina AI search endpoint
    const searchUrl = `https://s.jina.ai/${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const text = await response.text();
    
    return NextResponse.json({
      query,
      results: text,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to perform search' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Use Jina AI reader endpoint
    const readerUrl = `https://r.jina.ai/http://${url.replace(/^https?:\/\//, '')}`;
    
    const response = await fetch(readerUrl, {
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`Reader failed: ${response.status}`);
    }

    const text = await response.text();
    
    return NextResponse.json({
      url,
      content: text,
    });
  } catch (error) {
    console.error('Reader API error:', error);
    return NextResponse.json(
      { error: 'Failed to read URL' },
      { status: 500 }
    );
  }
}
