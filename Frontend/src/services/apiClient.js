/**
 * Shared fetch wrapper for cookie-based JWT auth (credentials: 'include').
 * In Vite dev, requests go through the /api proxy to the Express backend.
 * In production SPA, same-origin /api calls hit Express directly.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export class ApiClientError extends Error {
  constructor(message, statusCode = 500, payload = null) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, ...rest } = options;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      ...(isFormData || body == null ? {} : { 'Content-Type': 'application/json' }),
      ...headers,
    },
    body: body == null || isFormData ? body : JSON.stringify(body),
    ...rest,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok || payload?.success === false) {
    throw new ApiClientError(
      payload?.message || `Request failed with status ${response.status}`,
      response.status,
      payload
    );
  }

  return payload;
}
