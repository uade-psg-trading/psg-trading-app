import { describe, it, expect } from 'vitest';
import { createSession, getSession } from './session-store';

describe('SessionStore', () => {
  it('should create a new session', () => {
    // Get new sid
    const sid = createSession('test', 1000);

    // Then it should exists
    const session = getSession(sid);
    expect(session).not.undefined;
  });
});
