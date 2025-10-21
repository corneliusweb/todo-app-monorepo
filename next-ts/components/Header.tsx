'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuHouse } from 'react-icons/lu';

const Header = () => {
	const path = usePathname();
	const isHome = path === '/';
	return (
		<header className='px-8 py-4'>
			<nav>
				{isHome && (
					<ul className='flex justify-center items-center'>
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
							<button type='button' className='nav-btn'>
								Add Todo
							</button>
						</li>
					</ul>
				)}

				{!isHome && (
					<ul className='flex justify-between items-center'>
						<li>
							<Link href='/'>
								<span className='sr-only'>Home</span>
								<LuHouse size={32} />
							</Link>
						</li>
						<li>
							<button type='button' className='nav-btn'>Add Todo</button>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
};
export default Header;
