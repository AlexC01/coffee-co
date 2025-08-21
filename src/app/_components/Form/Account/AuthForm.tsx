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
		</>
	);
};

export default AuthForm;
