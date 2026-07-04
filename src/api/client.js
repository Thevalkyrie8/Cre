// Lightweight API client for Unitrux frontend
const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV)
	? '/api' // dev: use Vite proxy to avoid CORS
	: 'https://unitrux-api.up.railway.app/api';

const CHAT_API_BASE_URL = 'https://api.unitrux.site';

// Simple in-memory cache for GET requests
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for better performance

export async function fetchJson(path, options = {}) {
	const url = `${API_BASE_URL}${path}`;
	const method = (options.method || 'GET').toUpperCase();

	// Use cache for GET requests
	if (method === 'GET') {
		const cacheKey = url;
		const cached = cache.get(cacheKey);
		if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
			return cached.data;
		}
	}

	// Avoid setting Content-Type for simple GET to prevent CORS preflight (OPTIONS)
	const baseHeaders = { 'Accept': 'application/json' };
	const headers = method === 'GET'
		? { ...baseHeaders, ...(options.headers || {}) }
		: { ...baseHeaders, 'Content-Type': 'application/json', ...(options.headers || {}) };

	const response = await fetch(url, { ...options, method, headers });
	if (!response.ok) {
		const text = await response.text().catch(() => '');
		throw new Error(`Request failed ${response.status}: ${text || response.statusText}`);
	}

	const data = await response.json();

	// Cache successful GET responses
	if (method === 'GET') {
		const cacheKey = url;
		cache.set(cacheKey, { data, timestamp: Date.now() });
	}

	return data;
}

export function getProducts(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/products${qs}`);
}

// Additional helpers based on api.md
export function getNews(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/news${qs}`);
}

export function getCategories(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/categories${qs}`);
}

export function getNewsById(id, params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/news/${id}${qs}`);
}

export function getFeaturedNews(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/news/featured${qs}`);
}

export function getPackages(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/packages${qs}`);
}

export function getPopularPackages() {
	return fetchJson('/packages/popular');
}

export function getServices(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/services${qs}`);
}

export function getServiceById(id) {
	return fetchJson(`/services/${id}`);
}

export function listMedia(params = {}) {
	const query = new URLSearchParams(params).toString();
	const qs = query ? `?${query}` : '';
	return fetchJson(`/media${qs}`);
}

export function createContact(payload) {
	return fetchJson('/contacts', { method: 'POST', body: JSON.stringify(payload) });
}

export function sendUnitruxChat(payload) {
	return fetch(`${CHAT_API_BASE_URL}/chat/unitrux`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	}).then(async (response) => {
		if (!response.ok) {
			const text = await response.text().catch(() => '');
			throw new Error(`Request failed ${response.status}: ${text || response.statusText}`);
		}

		return response.json();
	});
}
