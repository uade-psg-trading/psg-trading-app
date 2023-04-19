import type { Cookies } from '@sveltejs/kit';
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
    locals.jwt = undefined;
    locals.username = undefined;
    return null;
  }

  locals.username = session.username;
  locals.jwt = jwt;
  return jwt;
};

export const newSession = (cookies: Cookies, username: string, jwt: string) => {
  if (getSession(jwt)) {
    return;
  }

  const sessionJwt = createSession(username, sessionMaxAge, jwt);
  cookies.set(jwtCookie, sessionJwt, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: sessionMaxAge
  });
};

export const removeSession = (cookies: Cookies, locals: App.Locals) => {
  const jwt = cookies.get(jwtCookie);
  if (jwt) {
    deleteSession(jwt);
    cookies.delete(jwtCookie, {
      // httpOnly: true,
      path: '/'
      // secure: true,
      // sameSite: 'strict'
    });
    cookies.set(jwtCookie, '', {
      // httpOnly: true,
      path: '/',
      // secure: true,
      // sameSite: 'strict',
      maxAge: 0
    });

    locals.jwt = undefined;
    locals.username = undefined;
  }
};
