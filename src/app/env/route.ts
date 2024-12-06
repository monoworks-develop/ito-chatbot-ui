import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  if (!name) return new Response('name is required', { status: 400 });

  return new Response(process.env[name] || '');
}
