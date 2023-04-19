import { getCurrentSession } from '$lib/server/cookie-manager';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies, locals } = event;
  getCurrentSession(cookies, locals);
  return await resolve(event);
}) satisfies Handle;
