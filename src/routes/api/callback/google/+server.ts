import { oauth2client } from '$lib/oauth/google';
import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { session } from '$lib/api/endpoints';
import { getCurrentSession, newSession } from '$lib/server/cookie-manager';

export const GET = (async ({ url, cookies, locals }) => {
  if (getCurrentSession(cookies, locals)) {
    throw redirect(307, '/portfolio');
  }

  const code = url.searchParams.get('code');
  if (code) {
    try {
      const {
        tokens: { id_token }
      } = await oauth2client.getToken(code);

      if (id_token) {
        const sessionData = await session.validateGoogleToken(id_token, 'psg');
        if (sessionData.success && sessionData.data) {
          const { jwt, username } = sessionData.data;
          newSession(cookies, username, jwt);
          return new Response(null, {
            status: 302,
            headers: {
              location: '/portfolio',
              'cache-control': 'no-store no-cache'
            }
          });
        } else {
          throw error(500, 'Hubo un error con nuestros servidores');
        }
      }
    } catch {
      throw error(500, 'Hubo un error con nuestros servidores');
    }
  }

  throw error(400, 'No pudimos validar tu sesion con Google');
}) satisfies RequestHandler;
