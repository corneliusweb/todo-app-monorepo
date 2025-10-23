'use client';
import { useState } from 'react';
import { signUp } from '@/lib/authActions';

export default function SignupPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await signUp(email, password);
			setMessage('✅ Signup successful! You can now log in.');
		} catch (error: any) {
			setMessage(`❌ ${error.message}`);
		}
	};

	return (
		<div style={{ maxWidth: 400, margin: '3rem auto' }}>
			<h2>Sign Up</h2>
			<form onSubmit={handleSignup}>
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
				<button type='submit'>Sign Up</button>
			</form>
			<p>{message}</p>
		</div>
	);
}
