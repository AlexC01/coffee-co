/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SelectField from '@/app/_components/Inputs/SelectField';
import TextField from '@/app/_components/Inputs/TextField';
import useDebounce from '@/app/hooks/useDebounce';

interface TopFiltersProps {
	updateParams: (option: string, value: string) => void;
}

const sortByOptions = [
	{ value: 'featured', label: 'Featured' },
	{ value: 'price-asc', label: 'Price Low to High' },
	{ value: 'price-desc', label: 'Price High to Low' },
];

const TopFilters = ({ updateParams }: TopFiltersProps) => {
	const searchParams = useSearchParams();

	const [search, setSearch] = useState<string>(
		searchParams.get('search') || '',
	);
	const updateSearch = (value: string) => setSearch(value);

	const debouncedSearchTerm = useDebounce({ value: search, delay: 500 });

	useEffect(() => {
		if (debouncedSearchTerm) updateParams('search', debouncedSearchTerm);
		else updateParams('search', '');
	}, [debouncedSearchTerm]);

	const [sortBy, setSortBy] = useState<string>(
		searchParams.get('sortBy') || '',
	);
	const updateSortBy = (value: string) => {
		setSortBy(value);
		updateParams('sortBy', value);
	};

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
