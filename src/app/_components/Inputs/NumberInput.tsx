interface NumberInputProps {
	placeholder: string;
	id: string;
	value: string;
	onChange: (value: string) => void;
	label?: boolean;
}

const NumberInput = ({
	placeholder,
	id,
	value,
	onChange,
	label,
}: NumberInputProps) => {
	return (
		<div>
			{label && (
				<label
					htmlFor={id}
					className="text-gray-500 text-sm font-semibold mb-1"
				>
					{placeholder}
				</label>
			)}
			<input
				type="number"
				placeholder={placeholder}
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="rounded border-1 border-gray-300 shadow-sm pl-2 py-1 w-full"
			/>
		</div>
	);
};

export default NumberInput;
