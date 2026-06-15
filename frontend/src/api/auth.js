import { API_BASE_URL, AUTH_TOKEN_KEY } from '../utils/constants';

function getToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

async function authFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new Error('Unable to reach the server. Check your connection and try again.');
  }

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.';
    try {
      const data = await response.json();
      if (data.detail) {
        message = typeof data.detail === 'string' ? data.detail : message;
      }
    } catch {
      /* ignore */
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function registerUser({ email, username, password }) {
  return authFetch('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  });
}

export async function loginUser({ email, password }) {
  return authFetch('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function fetchCurrentUser() {
  return authFetch('/api/v1/auth/me');
}

export async function updateUserProfile(updates) {
  return authFetch('/api/v1/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

export async function completeUserProfile({ name, gender, age }) {
  return authFetch('/api/v1/auth/complete-profile', {
    method: 'POST',
    body: JSON.stringify({ name, gender, age }),
  });
}
