const LoadingSpinner = ({ size = 'h-6 w-6' }) => {
	return (
		<div
			className={`animate-spin rounded-full ${size} border-b-2 border-blue-500`}
		/>
	);
};

export default LoadingSpinner;
