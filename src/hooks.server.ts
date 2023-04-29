import { getCurrentSession } from '$lib/server/cookie-manager';
import { getTenant } from '$lib/server/tenant-manager';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies, locals, url } = event;
  getCurrentSession(cookies, locals);
  setTenant(url, locals);
  return await resolve(event);
}) satisfies Handle;

function setTenant(url: URL, locals: App.Locals) {
  const tenant = getTenant(url);
  locals.tenant = {
    id: tenant
  };
}
