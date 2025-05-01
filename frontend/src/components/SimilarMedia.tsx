import { useState } from "react";
import { X } from 'lucide-react';

interface SimilarMediaProps {
	similarMedia: string[],
	addMedia: (media: string) => void;
	removeMedia: (index: number) => void;
}

const SimilarMedia = ({ similarMedia, addMedia, removeMedia }: SimilarMediaProps) => {
	const [mediaInput, setMediaInput] = useState<string>('')
	const [error, setError] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMediaInput(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			e.preventDefault();
			addMedia(mediaInput);
			setMediaInput('');
		}
		
	};

	const handleSubmit = () => {
		if (similarMedia.length < 5) {
			if (mediaInput.trim() != '') {
				addMedia(mediaInput);
				setMediaInput('');
			}
		}
		else {
			setError("Can only add up to 5 similar media");
		}
	};

	return (
		<div>
			<h2 className="text-xl font-semibold">Add Similar Media you enjoy</h2>

			{error.length > 0 && <div>{error}</div>}

			<div className="flex">
				<input 
					type="text"
					value={mediaInput}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					placeholder="Enter a title and press enter"
					className="flex-grow p-2 border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary300"
				/>
				<button
					onClick={handleSubmit}
					className="bg-primary500 text-white p-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary800 hover:cursor-pointer"
				>
					Add
				</button>
			</div>

			{similarMedia.length > 0 && (
				<div className="space-y-2">
					{similarMedia.map((media, index) => (
						<div
							key={index}
							className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
						>
							<span>{media}</span>
							<button
								onClick={() => removeMedia(index)}
								className="text-red-500 hover:text-red-700"
							>
								<X />
							</button>
						</div>
					))}
				</div>
			)}

		</div>
	)
}

export default SimilarMedia;