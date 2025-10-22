import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LuHouse } from 'react-icons/lu';
import Modal from './Modal';
import AddTodoForm from './AddTodoForm';
import SuccessModal from './SuccessModal';
import { MdMenu } from 'react-icons/md';

const Header = () => {
	const location = useLocation();
	const path = location.pathname;

	const isHome = path === '/';
	const isErrorPage = path === '/test-error';

	const navigate = useNavigate();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [showSuccess, setShowSuccess] = useState<boolean>(false);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const handleAddSuccess = () => {
		setShowModal(false);
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 1000);
		if (path !== '/todos') navigate('/todos');
	};

	return (
		<>
			{path !== '/test-error' && (
				<header className='px-4 py-4 max-w-2xl mx-auto sm:px-0'>
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
										<Link className='nav-link' to='/todos'>
											Todos
										</Link>
									</li>
									<li>
										<Link className='nav-link' to='/test-error'>
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
									<Link to='/'>
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
			)}
		</>
	);
};
export default Header;
