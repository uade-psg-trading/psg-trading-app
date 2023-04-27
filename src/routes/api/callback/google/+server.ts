import { oauth2client } from '$lib/oauth/google';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { session } from '$lib/api/endpoints';
import { getCurrentSession, newSession } from '$lib/server/cookie-manager';

export const GET = (async ({ url, cookies, locals }) => {
  if (getCurrentSession(cookies, locals)) {
    throw redirect(307, '/portfolio');
  }

  console.log('Entre al get de api google provider');
  const code = url.searchParams.get('code');
  if (code) {
    console.log('codigo', code);
    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);
    const {
      tokens: { id_token }
    } = await oauth2client.getToken(code);

    console.log('token', id_token);
    if (id_token) {
      const sessionData = await session.validateGoogleToken(id_token);
      console.log('session', sessionData);
      if (sessionData.success && sessionData.data) {
        const { jwt, username } = sessionData.data;
        newSession(cookies, username, jwt);
        throw redirect(302, '/portfolio');
      } else {
        throw error(500, 'Hubo un error con nuestros servidores');
      }
    }
  }

  throw error(400, 'No pudimos validar tu sesion con Google');
}) satisfies RequestHandler;
