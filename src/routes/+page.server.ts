import { getCurrentSession } from '$lib/server/cookie-manager';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
  const session = getCurrentSession(cookies, locals);
  if (!session) {
    throw redirect(307, '/sign-in');
  } else {
    throw redirect(307, '/portfolio');
  }
}) satisfies PageServerLoad;
