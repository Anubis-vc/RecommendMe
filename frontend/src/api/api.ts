import { RecommendationRequest, RecommendationResponse, Recommendation } from '../types.ts'

export const getRecs = async (params: RecommendationRequest): Promise<Recommendation[]> => {
	const response = await fetch('/api/recommend', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(params)
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
    	throw new Error(errorData.error || `Error: ${response.status}`);
	}

	const data: RecommendationResponse = await response.json()
	return data.recs;
}