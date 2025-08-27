interface TextFieldProps {
	placeholder: string;
	id: string;
	value: string;
	onChange: (value: string) => void;
	label?: string;
	icon?: React.ReactElement;
	type?: string;
	error?: boolean;
	onBlur?: () => void;
}

const TextField = ({
	id,
	placeholder,
	value,
	onChange,
	label,
	icon,
	type = 'text',
	error,
	onBlur,
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
					className={`w-full rounded bg-white  shadow-sm pl-3 py-2 border-1 focus:outline-none ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
					onChange={(e) => onChange(e.target.value)}
					value={value}
					onBlur={onBlur}
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
