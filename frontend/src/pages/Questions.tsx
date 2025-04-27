import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecs } from '../api/api.ts';
import { MediaType, Mood, RecommendationRequest } from '../../types.ts';

const MEDIA_TYPES = [
	'Movie', 'TV Show', 'Book', 'Podcast', 'Music', 'Video Game'
];

//TODO: only allow up to 5 similar media
//TODO: check new request set up against backend
//TODO: would this be better without as many buttons to click through?
//TODO: section for streaming services?
const FormPage = () => {
	const navigate = useNavigate()
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [similarMediaInput, setSimilarMediaInput] = useState<string>('');
	const [formData, setFormData] = useState<RecommendationRequest>({
		mediaTypes: [],
		similarMedia: [],
		mood: null,
	})

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const toggleMediaType = (media: MediaType) => {
		setFormData(prev => {
			if (prev.mediaTypes.includes(media)) {
				return {...prev, mediaTypes: prev.mediaTypes.filter(x => x != media)}
			}
			else {
				return {...prev, mediaTypes: [...prev.mediaTypes, media]}
			}
		})
	};

	const addSimilarMedia = (media: string) => {
		if (media.trim() != '') {
			setFormData(prev => ( {...prev, similarMedia: [...prev.similarMedia, media] }));
		}
	};

	const removeSimilarMedia = (index: number) => {
		setFormData(prev => ({
			...prev,
			similarMedia: prev.similarMedia.filter((_, i) => i != index),
		}));
	};

	const selectMood = (mood: Mood) => {
		setFormData(prev => ({ ...prev, mood: mood }));
	}

	const handlMediaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSimilarMediaInput(e.target.value);
	}

	const handleMediaInputSubmit = () => {
		addSimilarMedia(similarMediaInput);
		setSimilarMediaInput('');
	}

	const nextStep = () => {
		setCurrentStep(Math.min(currentStep + 1, 3));
	};

	const prevStep = () => {
		setCurrentStep(Math.max(1, currentStep - 1));
	};

	const canProceed = () => {
		switch(currentStep) {
			case 1:
				return formData.mediaTypes.length > 0
			case 2:
				return formData.similarMedia.length > 0
			case 3:
				return formData.mood != null
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const request: RecommendationRequest = {
			mediaTypes: formData.mediaTypes,
			similarMedia: formData.similarMedia,
			mood: formData.mood
		};

		try {
			const recs = await getRecs(request);

			// Store recommendations in localStorage to access them on the results page
			localStorage.setItem('recs', JSON.stringify(recs));
			navigate('/recs');
		}
		catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to get recommendations');
		}
		finally {
			setIsLoading(false)
		}
	};

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Media Recommendation Finder</h1>

			<form onSubmit={handleSubmit} className="space-y-8">
				<section>
					<h2 className="text-xl font-semibold text-gray-800 mb-4">Select Media Types</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
						{MEDIA_TYPES.map(mediaType => (
							<div
								key={mediaType}
								className={`
						  h-24 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all duration-200
						  ${selectedMediaTypes.includes(mediaType)
										? 'bg-blue-500 text-white border-blue-500'
										: 'border-gray-300 hover:border-blue-300 text-gray-700'}
						`}
								onClick={() => toggleMediaType(mediaType)}
							>
								<span className="font-medium text-center px-2">{mediaType}</span>
							</div>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-gray-800 mb-4">Similar To</h2>
					<input
						type="text"
						value={similarMedia}
						onChange={(e) => setSimilarMedia(e.target.value)}
						placeholder="Enter titles separated by commas (e.g. The Matrix, Lord of the Rings)"
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</section>

				<section>
					<h2 className="text-xl font-semibold text-gray-800 mb-4">Mood</h2>
					<select
						value={selectedMood}
						onChange={(e) => setSelectedMood(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
					>
						<option value="">Select a mood (optional)</option>
						{MOODS.map(mood => (
							<option key={mood} value={mood}>{mood}</option>
						))}
					</select>
				</section>

				{error && (
					<div className="px-4 py-3 bg-red-50 text-red-700 rounded-md border border-red-200">
						{error}
					</div>
				)}

				<button
					type="submit"
					className={`
					w-full py-4 px-6 rounded-md font-semibold text-white text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
					${isLoading
							? 'bg-blue-300 cursor-not-allowed'
							: 'bg-blue-600 hover:bg-blue-700 transition-colors duration-200'}
				  `}
					disabled={isLoading}
				>
					{isLoading ? 'Finding Recommendations...' : 'Find Recommendations'}
				</button>
			</form>
		</div>
	);
};

export default FormPage;