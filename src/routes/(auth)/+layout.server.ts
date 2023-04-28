import { getCurrentSession } from '$lib/server/cookie-manager';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies, locals }) => {
  const session = getCurrentSession(cookies, locals);
  if (!session) {
    throw error(401, 'Lo que estas buscando parece que no existe');
  }

  return {};
}) satisfies LayoutServerLoad;
