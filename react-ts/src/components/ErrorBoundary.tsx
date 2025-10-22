import React from 'react';
import { Link } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(): void {}

	resetError = () => {
		this.setState({ hasError: false, error: null });
	};

	render() {
		if (this.state.hasError) {
			return (
				<>
					<div className='text-center h-screen grid place-content-center'>
						<div className='w-full'>
							<h2 className='text-lg'>Something went wrong globally.</h2>
							<pre className='text-red-500 text-lg mt-4'>
								{this.state.error?.toString()}
							</pre>

							<div className='w-full flex gap-6 mt-45 justify-center'>
								<Link
									to='/'
									className='back-link justify-between'
									onClick={this.resetError}
								>
									<IoChevronBack /> Back to Home
								</Link>
								<button
									onClick={this.resetError}
									className='cursor-pointer back-link'
								>
									Try again
								</button>
							</div>
						</div>
					</div>
				</>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
