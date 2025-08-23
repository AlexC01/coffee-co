'use client';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { KeySquare, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '@/app/lib/firebase';
import TextField from '../../Inputs/TextField';

const AuthForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mode, setMode] = useState<'login' | 'signup'>('login');

	const fetchSignUp = async () => {
		try {
			if (mode === 'login') {
				await signInWithEmailAndPassword(auth, email, password);
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
			}
			toast.success(`${mode === 'login' ? 'Log In' : 'Sign Up'} successfully`);
			router.push('/');
		} catch (err) {
			toast.error('There was an error, please try again');
		}
	};

	return (
		<>
			<h1 className="text-3xl text-center font-bold text-gray-600">
				{mode === 'login' ? 'Sign In' : 'Sign Up'}
			</h1>
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
							value={email}
							onChange={(value) => setEmail(value)}
							icon={<Mail strokeWidth={1.4} />}
						/>
					</div>
					<div className="mt-6">
						<TextField
							placeholder="test123"
							label="Password"
							id="password"
							value={password}
							onChange={(value) => setPassword(value)}
							type="password"
							icon={<KeySquare strokeWidth={1.4} />}
						/>
					</div>
				</form>
			</div>
			{mode === 'login' && (
				<div className="mt-5 flex justify-end">
					<span className="inline-block text-gray-500 font-medium underline cursor-pointer text-sm hover:text-gray-800 transition-colors duration-200">
						Forgot Password?
					</span>
				</div>
			)}

			<button
				type="button"
				onClick={fetchSignUp}
				className="bg-accent-500 text-white font-bold mt-6 cursor-pointer rounded-md uppercase py-3 px-4 w-full transition-all duration-200 shadow-lg hover:shadow-sm"
			>
				{mode === 'login' ? 'Sign In' : 'Sign Up'}
			</button>

			<p className="mt-6 text-center text-gray-600 ">
				{mode === 'login'
					? 'Do not have an account?'
					: 'Already have an account?'}
				<button
					type="button"
					className="text-gray-500 font-medium underline cursor-pointer ml-2 hover:text-gray-800 transition-colors duration-200"
					onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
				>
					{mode === 'login' ? 'Sign Up' : 'Sign In'}
				</button>
			</p>

			<div className="mt-8 flex items-center justify-center gap-4">
				<div className="h-[1px] w-full bg-gray-400" />
				<p>OR</p>
				<div className="h-[1px] w-full bg-gray-400" />
			</div>
		</>
	);
};

export default AuthForm;
