'use client';

import { Search } from 'lucide-react';
import TextField from '@/app/_components/Inputs/TextField';

const TopFilters = () => {
	return (
		<div className="flex flex-row items-center justify-between mb-5">
			<div className="w-1/2">
				<TextField
					value=""
					onChange={(value: string) => {}}
					placeholder="Search"
					id="search"
					icon={<Search strokeWidth={2} className="text-gray-500" />}
				/>
			</div>
			<TextField
				value=""
				onChange={(value: string) => {}}
				placeholder="Search"
				id="search"
			/>
		</div>
	);
};

export default TopFilters;
