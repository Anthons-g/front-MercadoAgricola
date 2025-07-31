const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error en la petición a ${url}: ${response.statusText}`);
  }
  return response.json();
}
