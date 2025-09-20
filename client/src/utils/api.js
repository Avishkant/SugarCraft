// Purchase sweets in cart
export async function purchaseCart(cart, token) {
	// cart: array of { _id, cartQty }
	const results = [];
	for (const item of cart) {
		const res = await fetch(`${BASE_URL}/sweets/${item._id}/purchase`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ quantity: item.cartQty }),
		});
		if (!res.ok) {
			results.push({ _id: item._id, error: (await res.json()).message || 'Failed to purchase' });
		} else {
			results.push(await res.json());
		}
	}
	return results;
}
// SWEETS CRUD
export async function fetchSweets(token, page = 1, limit = 20) {
	const headers = {};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	const res = await fetch(`${BASE_URL}/sweets?page=${page}&limit=${limit}`, {
		method: 'GET',
		headers,
	});
	if (!res.ok) throw new Error((await res.json()).message || 'Failed to fetch sweets');
	return res.json();
}

export async function addSweet(data, token) {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('category', data.category);
	formData.append('price', data.price);
	formData.append('quantity', data.quantity);
	if (data.image) formData.append('image', data.image);
	const res = await fetch(`${BASE_URL}/sweets`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
		},
		body: formData,
	});
	if (!res.ok) throw new Error((await res.json()).message || 'Failed to add sweet');
	return res.json();
}
// API utility for authentication endpoints
// Use VITE_SERVER_URL from .env for backend API base URL
export const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export async function registerUser(data) {
	try {
		console.log('Registering user:', data);
		const res = await fetch(`${BASE_URL}/auth/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		console.log('Response status:', res.status);
		let result;
		try {
			result = await res.json();
		} catch (jsonErr) {
			const text = await res.text();
			console.error('Non-JSON response:', text);
			throw new Error('Non-JSON response from server');
		}
		if (!res.ok) {
			console.error('API error:', result);
			throw new Error(result.message || 'Registration failed');
		}
		return result;
	} catch (err) {
		console.error('registerUser error:', err);
		throw err;
	}
}

export async function loginUser(data) {
	const res = await fetch(`${BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
	return res.json();
}
