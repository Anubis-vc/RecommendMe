import { Mood } from "../../types";

interface MoodProps {
	mood: Mood | null
	setMood: (mood: Mood) => void
}

const MoodStep = ({ mood, setMood }: MoodProps) => {
	const moodArr: Mood[] = ['Happy', 'Sad', 'Relaxed', 'Energetic', 'Thoughtful', 'Excited', 'Nostalgic', 'Romantic', 'Mysterious', 'Hot'];
	
	return (
		<>
			{mood ? <h1>{mood}</h1> : <h2>How are you feeling today?</h2>} 
			<div>
				{moodArr.map((option) => (
					<div
						key={option}
						onClick={() => setMood(option)}
					>
						{option}
					</div>
				))}
			</div>
		</>
	)
};

export default MoodStep;