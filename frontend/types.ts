export type MediaType = 'Movie' | 'TV Show' | 'Book' | 'Podcast' | 'Music' | 'Video Game'
export type Mood = 'Happy' | 'Sad' | 'Relaxed' | 'Energetic' | 'Thoughtful' | 'Excited' | 'Nostalgic' | 'Romantic' | 'Mysterious' | 'Hot'

export interface Recommendation {
	title: string;
	mediaType: string;
	creator: string;
	releaseYear: number;
	summary: string;
}

export interface RecommendationRequest {
	mediaTypes: MediaType[];
	similarMedia: string[];
	mood: Mood | null;
}

export interface RecommendationResponse {
	recs: Recommendation[]
}