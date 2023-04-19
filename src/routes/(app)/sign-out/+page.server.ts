import { removeSession } from '$lib/server/cookie-manager';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies, locals }) => {
  console.log('entering sign out load func');
  removeSession(cookies, locals);
  throw redirect(307, '/sign-in');
}) satisfies PageServerLoad;
