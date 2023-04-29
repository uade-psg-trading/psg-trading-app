import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getCurrentSession } from '$lib/server/cookie-manager';
import { getCurrentTenant } from '$lib/server/tenant-manager';

export const load = (async ({ locals, cookies }) => {
  const session = getCurrentSession(cookies, locals);
  if (session) {
    throw redirect(307, '/portfolio');
  }

  const tenant = getCurrentTenant(locals);
  return { tenant };
}) satisfies LayoutServerLoad;
