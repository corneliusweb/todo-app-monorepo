'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuHouse } from 'react-icons/lu';
import { MdMenu } from 'react-icons/md';
import Modal from '@/components/Modal';
import AddTodoForm from '@/components/AddTodoForm';
import SuccessModal from '@/components/SuccessModal';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
	const path = usePathname();
	const isHome = path === '/';
	const isErrorPage = path === '/test-error';
	const router = useRouter();
	const { user, loading, logout } = useAuth();

	const [showModal, setShowModal] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleAddSuccess = () => {
		setShowModal(false);
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 1000);
		if (path !== '/todos') router.push('/todos');
	};

	const handleLogout = async () => {
		await logout();
		router.push('/');
		setIsMenuOpen(false);
	};

	// don't show header on error page
	if (isErrorPage) return null;

	// show loading state
	if (loading) {
		return (
			<header className='px-4 py-4 max-w-2xl mx-auto sm:px-0'>
				<div className='h-8 bg-gray-200 animate-pulse rounded'></div>
			</header>
		);
	}

	return (
		<>
			<Modal open={showModal} onClose={() => setShowModal(false)}>
				<AddTodoForm onSuccess={handleAddSuccess} />
			</Modal>
			<SuccessModal open={showSuccess} />

			<header className='px-4 py-4 max-w-2xl mx-auto sm:px-0'>
				<nav>
					{isHome && user && (
						<>
							<button
								type='button'
								className='sm:hidden cursor-pointer'
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								aria-label='Toggle menu'
							>
								<MdMenu size={32} />
							</button>

							{user && (
								// Logged in user navigation
								<ul
									className={`sm:flex sm:justify-center sm:items-center sm:gap-4 ${
										isMenuOpen
											? 'grid gap-5 bg-white p-4 rounded-md shadow-md'
											: 'hidden'
									}`}
								>
									<li>
										<Link className='nav-link' href='/todos'>
											Todos
										</Link>
									</li>
									<li>
										<Link className='nav-link' href='/test-error'>
											Test Error Boundary
										</Link>
									</li>
									<li>
										<button
											type='button'
											className='nav-btn w-full sm:w-auto'
											onClick={() => setShowModal(true)}
										>
											Add Todo
										</button>
									</li>
									
									<li>
										<button
											type='button'
											className='nav-btn w-full sm:w-auto bg-red-500/70 hover:bg-red-600'
											onClick={handleLogout}
										>
											Logout
										</button>
									</li>
								</ul>
							)}
						</>
					)}

					{!isHome && user && (
						<ul className='flex justify-between items-center'>
							<li>
								<Link href='/'>
									<span className='sr-only'>Home</span>
									<LuHouse size={32} />
								</Link>
							</li>
							{!isErrorPage && (
								<li className='flex items-center gap-4'>
									<span className='text-sm text-gray-600 hidden sm:inline'>
										{user.email}
									</span>
									<button
										type='button'
										className='nav-btn'
										onClick={() => setShowModal(true)}
									>
										Add Todo
									</button>
								</li>
							)}
						</ul>
					)}
				</nav>
			</header>
		</>
	);
};

export default Header;
