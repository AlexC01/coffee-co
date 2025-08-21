interface TextFieldProps {
	placeholder: string;
	id: string;
	value: string;
	onChange: (value: string) => void;
	label?: string;
	icon?: React.ReactElement;
	type?: string;
}

const TextField = ({
	id,
	placeholder,
	value,
	onChange,
	label,
	icon,
	type = 'text',
}: TextFieldProps) => {
	return (
		<div>
			{label && (
				<label
					className="text-gray-500 text-sm font-semibold mb-1"
					htmlFor={id}
				>
					{label}
				</label>
			)}
			<div className="relative mt-2">
				<input
					type={type}
					id={id}
					className="w-full rounded border-gray-300 bg-white  shadow-sm pl-3 py-2 border-1"
					onChange={(e) => onChange(e.target.value)}
					value={value}
					placeholder={placeholder}
				/>
				{icon && (
					<span
						className={`absolute inset-y-0 right-2 grid w-8 place-content-center`}
					>
						{icon}
					</span>
				)}
			</div>
		</div>
	);
};

export default TextField;
