'use client';

import { useEffect } from 'react';

const ErrorBoundary = () => {
	useEffect(() => {
		throw new Error('This is a test error!');
	}, []);

	return <p>Throwing error for testing...</p>;
};
export default ErrorBoundary;
