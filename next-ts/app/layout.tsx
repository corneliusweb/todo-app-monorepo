import type { Metadata } from 'next';
import { Space_Grotesk, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import QueryProvider from '@/components/QueryProvider';

const geistSans = Space_Grotesk({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Roboto({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Todo App - Next.js + TS',
	description: 'Todo App - Next.js + TS version',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<QueryProvider>
					<Header />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
