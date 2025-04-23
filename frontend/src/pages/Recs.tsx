import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recommendation } from '../../types';

const RecsPage = () => {
	const navigate = useNavigate();
	const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

	useEffect(() => {
		const storedRecs = localStorage.getItem('recs');

		if (storedRecs) {
			setRecommendations(JSON.parse(storedRecs));
		}
		else {
			navigate('/');
		}
	}, [navigate]);

	const handleBackClick = () => {
		navigate('/');
	};

	// TODO: RETURN FOR LOADING SKELETON
	if (recommendations.length === 0) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-xl text-gray-600">Loading recommendations...</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<header className="flex items-center mb-8">
				<button
					className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md mr-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					onClick={handleBackClick}
				>
					Another One!
				</button>
				<h1 className='text-3xl font-bold text-gray-900'>Your Recommendations</h1>
			</header>

			// TODO: RETURN AND MAKE THIS CAROUSEL WITH CARD COMPONENET CREATED
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{recommendations.map((rec, index) => (
					<div
						key={index}
						className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
					>
						<div className="p-6">
							<h2 className="text-xl font-bold text-gray-900 mb-2">{rec.title}</h2>
							<div className="flex items-center text-sm text-gray-600 mb-2">
								<span className="font-semibold mr-2">{rec.releaseYear}</span>
								<span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{rec.mediaType}</span>
							</div>
							<div className="text-gray-700 italic mb-4">by {rec.creator}</div>
							<p className="text-gray-600">{rec.summary}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecsPage;