'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuHouse } from 'react-icons/lu';
import Modal from '@/components/Modal';
import AddTodoForm from '@/components/AddTodoForm';
import SuccessModal from '@/components/SuccessModal';
import { MdMenu } from 'react-icons/md';

const Header = () => {
	const path = usePathname();
	const isHome = path === '/';
	const isErrorPage = path === '/test-error';
	const router = useRouter();

	const [showModal, setShowModal] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleAddSuccess = () => {
		setShowModal(false);
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 1000);
		if (path !== '/todos') router.push('/todos');
	};

	return (
		<header className='px-8 py-4'>
			<Modal open={showModal} onClose={() => setShowModal(false)}>
				<AddTodoForm onSuccess={handleAddSuccess} />
			</Modal>
			<SuccessModal open={showSuccess} />
			<nav>
				{isHome && (
					<>
						<button
							type='button'
							className='sm:hidden cursor-pointer'
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<MdMenu size={32} />
						</button>
						<ul
							className={`sm:flex sm:justify-center sm:items-center ${
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
									className='nav-btn w-full mt-7 sm:mt-0'
									onClick={() => setShowModal(true)}
								>
									Add Todo
								</button>
							</li>
						</ul>
					</>
				)}

				{!isHome && (
					<ul className='flex justify-between items-center'>
						<li>
							<Link href='/'>
								<span className='sr-only'>Home</span>
								<LuHouse size={32} />
							</Link>
						</li>
						{!isErrorPage && (
							<li>
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
	);
};
export default Header;
