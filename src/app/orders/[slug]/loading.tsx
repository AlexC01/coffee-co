import BreadCrumb from '@/app/_components/BreadCrumb';
import { routes } from '@/app/lib/models/Routes';

const loading = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-28">
			<BreadCrumb
				links={[
					{ label: 'Home', route: routes.home },
					{ label: 'Orders', route: routes.orders },
				]}
			/>

			<div className="mt-10 text-center flex-col flex items-center justify-center animate-pulse w-full">
				<div className="size-3 w-1/2 rounded-full bg-gray-400 mb-5" />
				<div className="size-3 w-1/2 rounded-full bg-gray-400 mb-5" />
			</div>
			<div className="mt-10 animate-pulse w-full">
				<div className="w-full h-56 bg-gray-400 rounded-md shadow-md size-20" />
			</div>
		</div>
	);
};

export default loading;
