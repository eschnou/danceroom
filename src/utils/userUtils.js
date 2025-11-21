/**
 * Generate a UUID that works in both secure and non-secure contexts
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts (HTTP over network)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get or generate a unique user ID stored in localStorage
 */
export function getUserId() {
  let userId = localStorage.getItem('danceroom_user_id');
  if (!userId) {
    userId = `user_${generateUUID()}`;
    localStorage.setItem('danceroom_user_id', userId);
  }
  return userId;
}

/**
 * Get or generate a random nickname stored in localStorage
 */
export function generateNickname() {
  let nickname = localStorage.getItem('danceroom_nickname');
  if (!nickname) {
    nickname = `User_${Math.floor(Math.random() * 10000)}`;
    localStorage.setItem('danceroom_nickname', nickname);
  }
  return nickname;
}

/**
 * Clear user data from localStorage (useful for testing)
 */
export function clearUserData() {
  localStorage.removeItem('danceroom_user_id');
  localStorage.removeItem('danceroom_nickname');
}
