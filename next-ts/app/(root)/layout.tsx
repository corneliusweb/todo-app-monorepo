export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <main className='px-6 sm:px-20'>{children}</main>;
}
