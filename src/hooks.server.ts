import { getSession } from '$lib/server/stores/session-store';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies } = event;
  const jwt = cookies.get('Auth');
  if (jwt) {
    const session = getSession(jwt);
    if (session) {
      event.locals.username = session.username;
      event.locals.jwt = jwt;
    } else {
      cookies.delete('Auth');
    }
  }

  return await resolve(event);
}) satisfies Handle;
