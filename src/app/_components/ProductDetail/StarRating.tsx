import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating }: { rating: number }) => {
	const stars = [1, 2, 3, 4, 5];
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;

	return (
		<div className="flex items-center">
			{stars.map((star, index) => {
				if (index < fullStars)
					return (
						<Star key={star} className="text-accent-500 fill-accent-500" />
					);
				else if (index === fullStars && hasHalfStar)
					return (
						<StarHalf key={star} className="text-accent-500 fill-accent-500" />
					);

				return <Star key={star} className="text-gray-400" />;
			})}
			<span className="inline-block ml-2 text-xl font-semibold text-gray-500">
				{rating}
			</span>
		</div>
	);
};

export default StarRating;
