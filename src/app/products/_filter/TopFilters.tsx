'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import SelectField from '@/app/_components/Inputs/SelectField';
import TextField from '@/app/_components/Inputs/TextField';

const sortByOptions = [
	{ value: 'featured', label: 'Featured' },
	{ value: 'price-asc', label: 'Price Low to High' },
	{ value: 'price-desc', label: 'Price High to Low' },
];

const TopFilters = () => {
	const [search, setSearch] = useState<string>('');
	const updateSearch = (value: string) => setSearch(value);

	const [sortBy, setSortBy] = useState<string>('');
	const updateSortBy = (value: string) => setSortBy(value);

	return (
		<div className="flex flex-row items-center justify-between mb-5">
			<div className="w-1/2">
				<TextField
					value={search}
					onChange={updateSearch}
					placeholder="Search"
					id="search"
					icon={<Search strokeWidth={2} className="text-gray-500" />}
				/>
			</div>
			<div className="w-1/4">
				<SelectField
					value={sortBy}
					onChange={updateSortBy}
					options={sortByOptions}
				/>
			</div>
		</div>
	);
};

export default TopFilters;
