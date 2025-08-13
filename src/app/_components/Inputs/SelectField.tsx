interface SelectFieldProps {
	value: string;
	onChange: (value: string) => void;
	options: { value: string; label: string }[];
}

const SelectField = ({ value, onChange, options }: SelectFieldProps) => {
	return (
		<select
			value={value}
			className="block w-full rounded px-2 shadow-sm py-2 border-1 border-gray-300 bg-white"
			onChange={(e) => onChange(e.target.value)}
		>
			<option value="" disabled>
				Sort By
			</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default SelectField;
