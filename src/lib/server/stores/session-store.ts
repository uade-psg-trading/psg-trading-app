type SessionInfo = {
  username: string;
  invalidAt: number;
};

const sessionStore = new Map<string, SessionInfo>();

export function createSession(username: string, maxAge: number, jwt: string): string {
  sessionStore.set(jwt, {
    username,
    invalidAt: Date.now() + maxAge
  });

  // if (Date.now() > nextClean) {
  //   setTimeout(() => {
  //     clean();
  //   }, 5000);
  // }

  return jwt;
}

export function getSession(jwt: string): SessionInfo | undefined {
  const session = sessionStore.get(jwt);
  if (session) {
    if (Date.now() > session.invalidAt) {
      sessionStore.delete(jwt);
      return undefined;
    } else {
      return session;
    }
  } else {
    return undefined;
  }
}

export function deleteSession(jwt: string) {
  sessionStore.delete(jwt);
}
