type IModal = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal: React.FC<IModal> = ({ open, onClose, children }) => {
	if (!open) return null;
	return (
		<div
			className='fixed top-0 left-0 w-screen h-screen bg-black/30 flex items-center justify-center z-50'
			onClick={onClose}
		>
			<div
				className='bg-white rounded-lg p-6 w-full max-w-[90vw] sm:max-w-md shadow-md relative'
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className='absolute top-2.5 right-4 text-3xl font-bold cursor-pointer text-gray-800'
					onClick={onClose}
					aria-label='Close'
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
