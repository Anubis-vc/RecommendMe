export type MessageRole = 'system' | 'user' | 'assisstant';

export interface Message {
	role: MessageRole;
	content: string;
}

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

export interface MediaRecommendation {
	title: string;
	creator: string;
	releaseYear: string;
	summary: string;
}

export interface RecommendationResponse {
	recommendations: MediaRecommendation[];
}

export interface ErrorResponse {
	error: string;
	details?: Record<string, string>;
}