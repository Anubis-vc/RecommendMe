import { MediaType } from "../../types"

interface MediaSelectProps {
	mediaTypes: MediaType[];
	toggleMediaType: (media: MediaType) => void;
}

const MediaSelect = ({ mediaTypes, toggleMediaType }: MediaSelectProps) => {
	const mediaOptions: MediaType[] = ['Movie', 'TV Show', 'Book', 'Podcast', 'Music', 'Video Game'];

	return (
		<div className="min-h-full">
			<div className="min-h-full grid grid-cols-2 gap-3">
				{mediaOptions.map(media => (
					<div
						key={media}
						className={`p-4 rounded-lg border cursor-pointer transition-all ${mediaTypes.includes(media)
							? 'bg-primary200 border-primary500'
							: 'border-gray-300 hover:bg-gray-100'}`}
						onClick={() => toggleMediaType(media)}
					>
						{media}
					</div>
				))}
			</div>
		</div>
	);
};

export default MediaSelect;