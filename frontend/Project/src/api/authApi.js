import api, { USER_PREFIX } from './axios';

// Strips the hashed password field before the user object ever
// touches app state / localStorage.
function sanitizeUser(user) {
  if (!user) return null;
  const { password: _password, ...safeUser } = user;
  return safeUser;
}

export async function register({ username, email, password }) {
  const { data } = await api.post(`${USER_PREFIX}/register`, { username, email, password });
  return { message: data.message, user: sanitizeUser(data.newUser) };
}

export async function login({ email, password }) {
  const { data } = await api.post(`${USER_PREFIX}/login`, { email, password });
  return { message: data.message, user: sanitizeUser(data.existingUser) };
}
