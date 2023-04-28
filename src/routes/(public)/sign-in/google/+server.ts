import type { RequestHandler } from './$types';
import { authUrl } from '$lib/oauth/google';

export const GET = (() => {
  return new Response(null, {
    headers: {
      location: authUrl,
      'Cache-Control': 'no-cache'
    },
    status: 302
  });
}) satisfies RequestHandler;
