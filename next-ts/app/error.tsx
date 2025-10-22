'use client';

import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';

interface ErrorProps {
	error: Error;
	reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
	const handleBackToHome = (e: React.MouseEvent) => {
		e.preventDefault();
		reset();
		window.location.href = '/';
	};

	return (
		<html>
			<body className='text-center h-screen grid place-content-center'>
				<div className='w-full'>
					<h2 className='text-lg'>Something went wrong globally.</h2>
					<pre className='text-red-500 text-lg mt-4'>{error?.message}</pre>

					<div className='w-full flex gap-6 mt-45 justify-center'>
						<Link
							href='/'
							className='back-link justify-between'
							onClick={handleBackToHome}
						>
							<IoChevronBack /> Back to Home
						</Link>
						<button onClick={reset} className='cursor-pointer back-link'>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	);
};
export default Error;
