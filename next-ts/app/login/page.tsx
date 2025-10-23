'use client';
import { useState } from 'react';
import { signIn, signInWithGoogle } from '@/lib/authActions';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signIn(email, password);
			setMessage('✅ Login successful!');
		} catch (error: any) {
			setMessage(`❌ ${error.message}`);
		}
	};

	const handleGoogle = async () => {
		try {
			await signInWithGoogle();
			setMessage('✅ Logged in with Google!');
		} catch (error: any) {
			setMessage(`❌ ${error.message}`);
		}
	};

	return (
		<div style={{ maxWidth: 400, margin: '3rem auto' }}>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
					type='email'
					required
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
					type='password'
					required
				/>
				<button type='submit'>Login</button>
			</form>
			<button onClick={handleGoogle}>Login with Google</button>
			<p>{message}</p>
		</div>
	);
}
