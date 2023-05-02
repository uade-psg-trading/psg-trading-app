import { getCurrentSession } from '$lib/server/cookie-manager';
import { getTenant, setCurrentTenant } from '$lib/tenant-manager';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies, locals, url } = event;
  getCurrentSession(cookies, locals);
  setCurrentTenant(locals, getTenant(url, locals));
  return await resolve(event);
}) satisfies Handle;
