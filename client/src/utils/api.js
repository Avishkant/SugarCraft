// API utility for authentication endpoints
const BASE_URL = 'http://localhost:5000/api'; // Change to your backend URL

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
