type SessionInfo = {
  username: string;
  invalidAt: number;
};

const sessionStore = new Map<string, SessionInfo>();

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

export function createSession(username: string, maxAge: number, jwt: string): string {
  sessionStore.set(jwt, {
    username,
    invalidAt: Date.now() + maxAge
  });

  if (Date.now() > nextClean) {
    setTimeout(() => {
      clean();
    }, 5000);
  }

  return jwt;
}

export function getSession(jwt: string): SessionInfo | undefined {
  const session = sessionStore.get(jwt);
  if (session) {
    if (Date.now() > session.invalidAt) {
      console.log('delete invalid session', jwt);
      sessionStore.delete(jwt);
      return undefined;
    } else {
      return session;
    }
  } else {
    console.log('session not found', jwt);
    return undefined;
  }
}
