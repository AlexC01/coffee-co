'use client';

import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="flex flex-col items-center gap-4">
				<Loader2 className="h-8 w-8 animate-spin text-accent-600" />
				<p className="text-gray-600 text-md">Loading...</p>
			</div>
		</div>
	);
};

export default LoadingSpinner;
