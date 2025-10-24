'use client';

import { useEffect, useState } from 'react';
import { signIn, signInWithGoogle } from '@/lib/authActions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SiGoogle } from 'react-icons/si';
import Link from 'next/link';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		// redirect if already logged in
		if (user) {
			router.push('/');
		}
	}, [user, router]);

	if (user) {
		//render nothing while redirecting
		return null;
	}

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signIn(email, password);
			setErrorMessage('✅ Login successful!');
			router.push('/');
		} catch (error: unknown) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage(
					'Failed to login into your account. Please try again.'
				);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			await signInWithGoogle();
			setErrorMessage('✅ Logged in with Google!');
		} catch (error: unknown) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage('Failed to login with Google.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center px-4'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='text-center text-3xl font-bold'>
						Create your account
					</h2>
					<p className='mt-2 text-center text-gray-600'>
						Or{' '}
						<Link
							href='/login'
							className='text-blue-500 hover:text-blue-600'
						>
							login to existing account
						</Link>
					</p>
				</div>

				{errorMessage && (
					<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
						{errorMessage}
					</div>
				)}

				<form className='mt-8 space-y-6' onSubmit={handleEmailLogin}>
					<div className='space-y-4'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium mb-2'
							>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
								placeholder='you@example.com'
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium mb-2'
							>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
								placeholder='••••••••'
								minLength={6}
							/>
						</div>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				<div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<div className='w-full border-t border-gray-300'></div>
					</div>
					<div className='relative flex justify-center text-sm'>
						<span className='px-2 bg-white text-gray-500'>
							Or continue with
						</span>
					</div>
				</div>

				<button
					type='button'
					onClick={handleGoogleLogin}
					disabled={loading}
					className='w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
				>
					<SiGoogle size={20} />
					{loading ? 'Signing up...' : 'Google'}
				</button>

				<p className='text-center text-sm text-gray-600'>
					<Link href='/' className='text-blue-500 hover:text-blue-600'>
						← Back to home
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
