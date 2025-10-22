export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <main className='px-3 mb-4 mt-8 sm:px-20 sm:mb-6'>{children}</main>;
}
