export interface Recommendation {
	title: string;
	mediaType: string;
	creator: string;
	releaseYear: number;
	summary: string;
}

export interface RecommendationRequest {
	mediaType: string[] | null;
	similarMedia: string[] | null;
	mood: string | null;
}

export interface RecommendationResponse {
	recs: Recommendation[]
}