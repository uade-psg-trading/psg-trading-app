import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { username } = locals;
  if (!username) {
    throw redirect(307, '/sign-in');
  } else {
    throw redirect(307, '/portfolio');
  }
}) satisfies PageServerLoad;
