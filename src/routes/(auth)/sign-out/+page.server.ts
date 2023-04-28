import { removeSession } from '$lib/server/cookie-manager';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ cookies, locals }) => {
  removeSession(cookies, locals);
  throw redirect(303, '/sign-in');
}) satisfies PageServerLoad;
