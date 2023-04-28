import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { username } = locals;
  if (username) {
    throw redirect(307, '/portfolio');
  }

  return {};
}) satisfies LayoutServerLoad;
