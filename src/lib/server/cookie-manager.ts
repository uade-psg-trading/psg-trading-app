import type { Cookies } from '@sveltejs/kit';
import { PUBLIC_COOKIE_DOMAIN } from '$env/static/public';
import { VERCEL_ENV } from '$env/static/private';
import { getSession, createSession, deleteSession } from './stores/session-store';

const jwtCookie = 'Auth';
const sessionMaxAge = 1000 * 60 * 60 * 24 * 30; // 30 days

export const getCurrentSession = (cookies: Cookies, locals: App.Locals): string | null => {
  const jwt = cookies.get(jwtCookie);
  if (!jwt) {
    return null;
  }

  const session = getSession(jwt);
  if (!session) {
    cookies.delete(jwtCookie);
    locals.session = undefined;
    return null;
  }

  locals.session = { jwt };
  return jwt;
};

export const newSession = (cookies: Cookies, username: string, jwt: string) => {
  if (getSession(jwt)) {
    return;
  }

  const sessionJwt = createSession(username, sessionMaxAge, jwt);
  if (VERCEL_ENV === 'preview') {
    cookies.set(jwtCookie, sessionJwt, {
      path: '/',
      maxAge: sessionMaxAge
    });
  } else {
    cookies.set(jwtCookie, sessionJwt, {
      path: '/',
      maxAge: sessionMaxAge,
      domain: PUBLIC_COOKIE_DOMAIN
    });
  }

  console.log('cookies', cookies.getAll());
};

export const removeSession = (cookies: Cookies, locals: App.Locals) => {
  const jwt = cookies.get(jwtCookie);
  if (jwt) {
    deleteSession(jwt);
    if (VERCEL_ENV === 'preview') {
      cookies.set(jwtCookie, '', {
        path: '/',
        maxAge: 0
      });
    } else {
      cookies.set(jwtCookie, '', {
        path: '/',
        maxAge: 0,
        domain: PUBLIC_COOKIE_DOMAIN
      });
    }

    locals.session = undefined;
  }
};
