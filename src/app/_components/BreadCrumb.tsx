import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface BreadCrumbProps {
	links: { label: string; route: string }[];
}

const BreadCrumb = ({ links }: BreadCrumbProps) => {
	return (
		<nav aria-label="BreadCrumb" className="mb-5">
			<ol className="flex items-center gap-1 text-md text-gray-500 ">
				{links.map((link, index) => (
					<li key={link.label} className="flex items-center gap-2">
						<Link
							href={link.route}
							className="block transition-colors duration-150 hover:text-gray-900"
						>
							{link.label}
						</Link>
						{index < links.length - 1 && (
							<span>
								<ChevronRight size={16} />
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default BreadCrumb;
