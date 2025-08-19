import StarRating from './StarRating';

const Reviews = () => {
	return (
		<div className="bg-white rounded-lg shadow-sm p-4 w-full">
			<StarRating rating={2} />

			<h4 className="font-semibold text-gray-600 text-xl mt-3.5">
				This Cup could have been better
			</h4>
			<span className="inline-block font-medium text-gray-700 text-lg mt-3">
				John Doe - 04/22/12
			</span>
			<p className="mt-4 text-lg">
				I would have liked if the mug could have been bigger, and with a better
				handle, overall good product.
			</p>
		</div>
	);
};

export default Reviews;
