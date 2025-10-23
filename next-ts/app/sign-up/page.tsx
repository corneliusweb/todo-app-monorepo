'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signUp, signInWithGoogle } from '@/lib/authActions';
import { useAuth } from '@/context/AuthContext';
import { SiGoogle } from 'react-icons/si';

const SignUpPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
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

	const handleEmailSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

		setLoading(true);

		try {
			await signUp(email, password);
			router.push('/login'); // redirect to login after successful sign up
		} catch (err: any) {
			setError(err.message || 'Failed to create account. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		setError('');
		setLoading(true);

		try {
			await signInWithGoogle();
			router.push('/'); // redirect to home after successful sign up
		} catch (err: any) {
			setError(err.message || 'Failed to sign up with Google.');
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

				{error && (
					<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
						{error}
					</div>
				)}

				<form className='mt-8 space-y-6' onSubmit={handleEmailSignUp}>
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
						<div>
							<label
								htmlFor='confirm-password'
								className='block text-sm font-medium mb-2'
							>
								Confirm Password
							</label>
							<input
								id='confirm-password'
								name='confirm-password'
								type='password'
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
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
						{loading ? 'Creating account...' : 'Sign Up'}
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
					onClick={handleGoogleSignUp}
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

export default SignUpPage;
