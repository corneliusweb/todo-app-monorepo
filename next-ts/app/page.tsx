'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const Home = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className='relative text-center h-screen -mt-20 -z-10'>
				<div className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
					<p className='mt-4 text-gray-600'>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className='relative text-center h-screen grid place-content-center'>
			<div className=' w-full px-4'>
				<h1 className='text-3xl sm:text-5xl font-bold mb-6'>
					Welcome to Todo App
				</h1>

				{user ? (
					// Logged in user view
					<div className='max-w-md mx-auto'>
						<p className='text-lg text-gray-600 mb-8'>
							Hello, <span className='font-semibold'>{user.email}</span>!
							👋
						</p>
						<p className='text-gray-500 mb-8'>
							Ready to manage your tasks?
						</p>
						<Link
							href='/todos'
							className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors'
						>
							View My Todos
						</Link>
					</div>
				) : (
					// Guest view
					<div className='max-w-md mx-auto'>
						<p className='text-lg text-gray-600 mb-8'>
							Stay organized and get things done! ✨
						</p>
						<p className='text-gray-500 mb-8'>
							Sign up or log in to start managing your todos.
						</p>
						<div className='flex gap-4 justify-center flex-col sm:flex-row'>
							<Link
								href='/sign-up'
								className='bg-green-500/90 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors'
							>
								Get Started
							</Link>
							<Link
								href='/login'
								className='bg-blue-500/90 border-blue-500 border hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors'
							>
								Login
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
