'use client';
import { KeySquare, Mail } from 'lucide-react';
import TextField from '../../Inputs/TextField';

const AuthForm = () => {
	return (
		<>
			<h1 className="text-3xl text-center font-bold text-gray-600">Log In</h1>
			<div className="px-20">
				<hr className="mt-6" />
			</div>
			<div className="mt-6">
				<form>
					<div>
						<TextField
							placeholder="example@gmail.com"
							label="Email"
							id="email"
							value=""
							onChange={() => {}}
							icon={<Mail strokeWidth={1.4} />}
						/>
					</div>
					<div className="mt-6">
						<TextField
							placeholder="test123"
							label="Password"
							id="password"
							value=""
							onChange={() => {}}
							type="password"
							icon={<KeySquare strokeWidth={1.4} />}
						/>
					</div>
				</form>
			</div>
			<div className="mt-5 flex justify-end">
				<span className="inline-block text-gray-500 font-medium underline cursor-pointer text-sm hover:text-gray-800 transition-colors duration-200">
					Forgot Password?
				</span>
			</div>

			<button
				type="button"
				className="bg-accent-500 text-white font-bold mt-6 cursor-pointer rounded-md uppercase py-3 px-4 w-full transition-all duration-200 shadow-xl hover:shadow-sm"
			>
				Log In
			</button>

			<div className="mt-8 flex items-center justify-center gap-4">
				<div className="h-[1px] w-full bg-gray-400" />
				<p>OR</p>
				<div className="h-[1px] w-full bg-gray-400" />
			</div>
		</>
	);
};

export default AuthForm;
