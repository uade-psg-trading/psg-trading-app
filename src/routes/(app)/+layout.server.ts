import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const { username } = locals;
  if (!username) {
    throw error(401, 'No puedes acceder aquí');
  }
  return {};
}) satisfies LayoutServerLoad;
