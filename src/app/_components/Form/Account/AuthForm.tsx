'use client';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	type UserCredential,
} from 'firebase/auth';
import { AlertCircle, KeySquare, LoaderCircle, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { auth } from '@/app/lib/firebase';
import { validateAuthForm } from '@/app/lib/schemas/userSchema';
import TextField from '../../Inputs/TextField';

const AuthForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [mode, setMode] = useState<'login' | 'signup'>('login');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	const validateField = (field: string, value: string) => {
		const formData = {
			email: field === 'email' ? value : email,
			password: field === 'password' ? value : password,
		};
		const validation = validateAuthForm(formData);

		if (!validation.success) {
			const errorMessage = validation.errors[field];
			if (errorMessage) {
				setErrors((prev) => ({ ...prev, [field]: errorMessage }));
			} else {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[field];
					return newErrors;
				});
			}
		} else {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setErrors({});

		const validationResult = validateAuthForm({ email, password });

		if (!validationResult.success) {
			setErrors(validationResult.errors);
			setTouched({ email: true, password: true });
			setLoading(false);
			return;
		}

		try {
			let userCredential: UserCredential;
			if (mode === 'login') {
				userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password,
				);
			} else {
				userCredential = await createUserWithEmailAndPassword(
					auth,
					email,
					password,
				);
			}

			const idToken = await userCredential.user.getIdToken();

			await fetch('/api/sessionLogin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ idToken }),
			});

			toast.success(`${mode === 'login' ? 'Log In' : 'Sign Up'} successfully`);
			router.push('/');
		} catch (err) {
			toast.error('There was an error, please try again');
		} finally {
			setLoading(false);
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
				<form onSubmit={handleSubmit}>
					<div>
						<TextField
							placeholder="example@gmail.com"
							label="Email"
							id="email"
							value={email}
							error={!!errors.email}
							onChange={(value) => {
								setEmail(value);
								if (touched.email) validateField('email', value);
							}}
							icon={<Mail strokeWidth={1.4} />}
							onBlur={() => {
								setTouched((prev) => ({ ...prev, email: true }));
								validateField('email', email);
							}}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm font-semibold mt-1 flex items-center gap-1">
								<AlertCircle size={14} />
								{errors.email}
							</p>
						)}
					</div>
					<div className="mt-6">
						<TextField
							placeholder="test123"
							label="Password"
							id="password"
							value={password}
							onChange={(value) => {
								setPassword(value);
								if (touched.password) validateField('password', value);
							}}
							onBlur={() => {
								setTouched((prev) => ({ ...prev, password: true }));
								validateField('password', password);
							}}
							type="password"
							error={!!errors.password}
							icon={<KeySquare strokeWidth={1.4} />}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm font-semibold mt-1 flex items-center gap-1">
								<AlertCircle size={14} />
								{errors.password}
							</p>
						)}
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
						onClick={handleSubmit}
						disabled={loading}
						className={`${loading ? 'opacity-55 cursor-not-allowed' : 'cursor-pointer'} bg-accent-500 text-white font-bold mt-6 rounded-md uppercase py-3 px-4 w-full transition-all duration-200 shadow-lg hover:shadow-sm flex items-center gap-2 justify-center`}
					>
						{mode === 'login' ? 'Sign In' : 'Sign Up'}
						{loading && <LoaderCircle className="animate-spin -mt-1" />}
					</button>
				</form>
			</div>

			<p className="mt-6 text-center text-gray-600 ">
				{mode === 'login'
					? 'Do not have an account?'
					: 'Already have an account?'}
				<button
					type="button"
					className="text-gray-500 font-medium underline cursor-pointer ml-2 hover:text-gray-800 transition-colors duration-200 "
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
