import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/stores/session-store';

export const load = (async ({ cookies, locals }) => {
  const session = cookies.get('Auth');
  console.log('session', session);
  if (session) {
    deleteSession(session);
    console.log('delete');
    cookies.delete('Auth', {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'strict'
    });
    locals.jwt = undefined;
    locals.username = undefined;
  }

  throw redirect(301, '/sign-in');
}) satisfies PageServerLoad;
