import AuthForm from '../_components/Form/Account/AuthForm';
import { PublicRoute } from '../_components/RouteProtection';

const page = () => {
	return (
		<PublicRoute>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen">
				<div className="flex justify-center items-center h-full">
					<div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
						<AuthForm />
					</div>
				</div>
			</div>
		</PublicRoute>
	);
};

export default page;
