const STORAGE_PREFIX = 'rl_';

interface RateLimitState {
  attempts: number;
  lockedUntil: number | null;
}

const BASE_LOCKOUT_SECONDS = 30;
const MAX_ATTEMPTS_BEFORE_LOCK = 5;
const MAX_LOCKOUT_SECONDS = 300; // 5 minutes cap

function getState(key: string): RateLimitState {
  if (typeof window === 'undefined') return { attempts: 0, lockedUntil: null };
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return { attempts: 0, lockedUntil: null };
    return JSON.parse(raw);
  } catch {
    return { attempts: 0, lockedUntil: null };
  }
}

function setState(key: string, state: RateLimitState) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(state));
  } catch {
    // sessionStorage full or unavailable
  }
}

/** Calculate lockout duration with exponential backoff */
function getLockoutSeconds(attempts: number): number {
  const lockRound = attempts - MAX_ATTEMPTS_BEFORE_LOCK;
  if (lockRound <= 0) return 0;
  // 30s, 60s, 120s, 240s, 300s (capped)
  return Math.min(BASE_LOCKOUT_SECONDS * Math.pow(2, lockRound - 1), MAX_LOCKOUT_SECONDS);
}

/**
 * Check if an action is rate-limited.
 * Returns `{ allowed: true }` or `{ allowed: false, retryAfter, message }`.
 */
export function checkRateLimit(key: string): {
  allowed: boolean;
  retryAfter?: number;
  message?: string;
} {
  const state = getState(key);

  if (state.lockedUntil) {
    const remaining = Math.ceil((state.lockedUntil - Date.now()) / 1000);
    if (remaining > 0) {
      return {
        allowed: false,
        retryAfter: remaining,
        message: `تعداد تلاش بیش از حد مجاز. ${remaining} ثانیه صبر کنید.`,
      };
    }
    // Lock expired — reset lock but keep attempt count
    setState(key, { ...state, lockedUntil: null });
  }

  return { allowed: true };
}

/** Record a failed attempt. Returns lock info if locked. */
export function recordFailedAttempt(key: string): {
  locked: boolean;
  retryAfter?: number;
  message?: string;
} {
  const state = getState(key);
  const newAttempts = state.attempts + 1;

  if (newAttempts >= MAX_ATTEMPTS_BEFORE_LOCK) {
    const lockSeconds = getLockoutSeconds(newAttempts);
    const lockedUntil = Date.now() + lockSeconds * 1000;
    setState(key, { attempts: newAttempts, lockedUntil });
    return {
      locked: true,
      retryAfter: lockSeconds,
      message: `تعداد تلاش بیش از حد مجاز. ${lockSeconds} ثانیه صبر کنید.`,
    };
  }

  setState(key, { attempts: newAttempts, lockedUntil: null });
  const remaining = MAX_ATTEMPTS_BEFORE_LOCK - newAttempts;
  return {
    locked: false,
    message: remaining <= 2 ? `${remaining} تلاش باقی‌مانده` : undefined,
  };
}

/** Reset attempts after successful action */
export function resetAttempts(key: string) {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(STORAGE_PREFIX + key);
}
