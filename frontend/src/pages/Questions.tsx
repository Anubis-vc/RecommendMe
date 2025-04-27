import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecs } from '../api/api.ts';
import { MediaType, Mood, RecommendationRequest } from '../../types.ts';
import MediaSelect from '../components/MediaSelect.tsx';

//TODO: only allow up to 5 similar media
//TODO: check new request set up against backend
//TODO: would this be better without as many buttons to click through?
//TODO: section for streaming services?
//TODO: Autocomplete on media
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

	const handlMediaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSimilarMediaInput(e.target.value);
	}

	const handleMediaInputSubmit = () => {
		addSimilarMedia(similarMediaInput);
		setSimilarMediaInput('');
	}

	const handleMediaInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'enter') {
			e.preventDefault();
			addSimilarMedia(similarMediaInput);
			setSimilarMediaInput('');
		}
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

			{/* Media Type Portion */}
			<MediaSelect
				mediaTypes={formData.mediaTypes}
				toggleMediaType={toggleMediaType}
			/>

			{/* Similar Media Portion */}

			{/* Mood Portion */}

			{/* Navigation */}
		</div>
	);
};

export default FormPage;