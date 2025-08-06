interface ReviewCardProps {
	name: string;
	review: string;
}

const ReviewCard = ({ name, review }: ReviewCardProps) => {
	return (
		<div className="shadow-xl w-full p-5 text-left rounded-xl bg-white">
			<p className="text-gray-600 italic text-lg">"{review}"</p>
			<h5 className="mt-4 font-bold"> -- {name}</h5>
		</div>
	);
};

export default ReviewCard;
