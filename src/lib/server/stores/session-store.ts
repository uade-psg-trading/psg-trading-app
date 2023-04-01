import { randomBytes } from 'node:crypto';

type SessionInfo = {
  username: string;
  // roles: string[];
  invalidAt: number;
};
type Sid = string;

const sessionStore = new Map<Sid, SessionInfo>();

const oneHour = 1000 * 60 * 60;
let nextClean = Date.now() + oneHour;
function clean() {
  const now = Date.now();
  for (const [sid, session] of sessionStore) {
    if (session.invalidAt < now) {
      sessionStore.delete(sid);
    }
  }
  nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
  console.log('next clean date', nextClean);
}

function getSid(): Sid {
  return randomBytes(32).toString('hex');
}

export function createSession(username: string, maxAge: number): string {
  let sid: Sid = '';

  do {
    sid = getSid();
  } while (sessionStore.has(sid));

  // const roles = getUserRoles(username);

  sessionStore.set(sid, {
    username,
    // roles,
    invalidAt: Date.now() + maxAge
  });

  if (Date.now() > nextClean) {
    setTimeout(() => {
      clean();
    }, 5000);
  }

  return sid;
}

export function getSession(sid: Sid): SessionInfo | undefined {
  const session = sessionStore.get(sid);
  if (session) {
    if (Date.now() > session.invalidAt) {
      console.log('delete invalid session', sid);
      sessionStore.delete(sid);
      return undefined;
    } else {
      return session;
    }
  } else {
    console.log('session not found', sid);
    return undefined;
  }
}
