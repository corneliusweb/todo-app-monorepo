const SuccessModal = ({
	open,
	message,
}: {
	open: boolean;
	message?: string;
}) => {
	if (!open) return null;
	return (
		<div className='fixed top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center z-50'>
			<div className='bg-white rounded-lg p-8 min-w-3xs max-w-[90vw] shadow-md text-center'>
				<h2 className='text-page-green m-0'>
					{message || 'Todo added successfully!'}
				</h2>
			</div>
		</div>
	);
};
export default SuccessModal;
