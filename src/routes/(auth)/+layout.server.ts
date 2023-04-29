import { getCurrentSession } from '$lib/server/cookie-manager';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getCurrentTenant } from '$lib/server/tenant-manager';

export const load = (async ({ cookies, locals }) => {
  const session = getCurrentSession(cookies, locals);
  if (!session) {
    throw error(401, 'Lo que estas buscando parece que no existe');
  }

  const tenant = getCurrentTenant(locals);
  return { tenant };
}) satisfies LayoutServerLoad;
