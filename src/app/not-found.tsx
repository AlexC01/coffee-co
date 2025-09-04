import Image from 'next/image';
import notFoundImage from '@/../public/images/notFound.svg';
import BreadCrumb from './_components/BreadCrumb';
import { routes } from './lib/models/Routes';

const notFound = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-28">
			<BreadCrumb links={[{ label: 'Home', route: routes.home }]} />
			<div className="mt-10 flex items-center justify-center flex-col">
				<Image
					src={notFoundImage}
					width={350}
					height={350}
					alt="Not Found Image"
				/>
				<p className="text-2xl font-bold mt-15">
					It looks like this page does not exist in our website
				</p>
			</div>
		</div>
	);
};

export default notFound;
