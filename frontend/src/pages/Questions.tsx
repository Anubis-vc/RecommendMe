import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecs } from '../api/api.ts';
import { MediaType, Mood, RecommendationRequest } from '../../types.ts';
import MediaSelect from '../components/MediaSelect.tsx';
import SimilarMedia from '../components/SimilarMedia.tsx';
import MoodStep from '../components/Mood.tsx';

//TODO: only allow up to 5 similar media
//TODO: check new request set up against backend
//TODO: would this be better without as many buttons to click through?
//TODO: section for streaming services?
//TODO: Autocomplete on media
const FormPage = () => {
	const navigate = useNavigate()
	const [currentStep, setCurrentStep] = useState<number>(2);
	const [formData, setFormData] = useState<RecommendationRequest>({
		mediaTypes: [],
		similarMedia: [],
		mood: null,
	})

	// const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>('');

	const toggleMediaType = (media: MediaType) => {
		setFormData(prev => {
			if (prev.mediaTypes.includes(media)) {
				return { ...prev, mediaTypes: prev.mediaTypes.filter(x => x != media) }
			}
			else {
				return { ...prev, mediaTypes: [...prev.mediaTypes, media] }
			}
		})
	};

	const addSimilarMedia = (media: string) => {
		if (media.trim() != '') {
			setFormData(prev => ({ ...prev, similarMedia: [...prev.similarMedia, media] }));
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

	const nextStep = () => {
		setCurrentStep(Math.min(currentStep + 1, 3));
	};

	const prevStep = () => {
		setCurrentStep(Math.max(1, currentStep - 1));
	};

	const canProceed = () => {
		switch (currentStep) {
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
		// setIsLoading(true);
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
			// setIsLoading(false)
		}
	};

	return (
		<div className="max-w-4xl min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">

			{/* Progress Bar */}
			<div className="mb-8">
				<div className="flex mb-2">
					<span className="text-sm font-medium">{currentStep} of 3</span>
				</div>
				<div className="w-full bg-gray-200 rounded-full h-2">
					<div
						className="bg-primary600 h-2 rounded-full transition-all duration-300"
						style={{ width: `${(currentStep / 3) * 100}%` }}
					/>
				</div>
			</div>

			{error && <div className='text-red-500'>{error}</div>}

			{/* Media Type Portion */}
			<MediaSelect
				mediaTypes={formData.mediaTypes}
				toggleMediaType={toggleMediaType}
			/>

			{/* Similar Media Portion */}
			<SimilarMedia
				similarMedia={formData.similarMedia}
				addMedia={addSimilarMedia}
				removeMedia={removeSimilarMedia}
			/>

			{/* Mood Portion */}
			<MoodStep
				mood={formData.mood}
				setMood={selectMood}
			/>

			{/* Navigation */}
			<div className='flex justify-between'>
				{currentStep > 1 ?
					<button
						onClick={prevStep}
						className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'
					>
						Back
					</button> :
					<div></div>
				}

				{currentStep < 3 ? (
					<button
						onClick={nextStep}
						className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${canProceed()
							? 'bg-blue-500 text-white hover:bg-blue-600'
							: 'bg-blue-300 text-white cursor-not-allowed'
							}`}
					>
						Next
					</button>
				) : (
					<button
						onClick={handleSubmit}
						disabled={!canProceed()}
						className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${canProceed()
								? 'bg-green-500 text-white hover:bg-green-600'
								: 'bg-green-300 text-white cursor-not-allowed'
							}`}
					>
						Submit
					</button>
				)}
			</div>
		</div>
	);
};

export default FormPage;