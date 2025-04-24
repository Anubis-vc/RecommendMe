import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react'

const HomePage = () => {
	const [text] = useTypewriter({
		words: ['books', 'movies', 'tv shows', 'podcasts', 'albums', 'video games', 'anything!'],
		loop: 1,
		typeSpeed: 50,
		deleteSpeed: 60,
		delaySpeed: 2000,
	});

	const options = {
		initial: {
			x: 0,
			opacity: 1,
		},
		exit: {
			x: '-50vw',
			opacity: 0,
			transition: {
				type: 'tween',
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	};

	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/form')
	}

	return (
		<motion.div
			className='relative flex flex-col justify-center min-h-screen w-full overflow-hidden'
			variants={options}
			initial="initial"
			exit="exit"
			animate="initial"
		>

			<motion.div
				className="absolute -top-20 -left-7 w-96 h-96 bg-primary300 rounded-full blur-3xl"
				initial={{ scale: 0.9, opacity: 0.1 }}
				animate={{
					scale: 1.25,
					opacity: 0.4,
					transition: {
						duration: 4,
						repeat: Infinity,
						repeatType: "reverse",
					}
				}}
			/>

			<motion.div
				className="absolute -bottom-16 -right-16 w-96 h-96 bg-primary300 rounded-full blur-3xl"
				initial={{ scale: 1.25, opacity: 0.45 }}
				animate={{
					scale: 0.9,
					opacity: 0.1,
					transition: {
						duration: 4,
						repeat: Infinity,
						repeatType: "reverse",
					}
				}}
			/>

			<div className="relative flex flex-col space-y-10 lg:flex-row lg:justify-between items-center px-12 md:px-24 lg:px-40">
				<div className='flex flex-col space-y-5'>
					<motion.p
						className="text-center text-sm sm:text-lg md:text-xl lg:text-4xl text-gray-400"
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 18.5, duration: 1 }}
					>
						AI-Powered Recommendations
					</motion.p>

					<div className='flex sm:flex-row space-x-2 lg:flex-col'>
						<h1 className="text-xl sm:text-2xl md:text-4xl lg:text-7xl font-bold mb-4">
							Recommend Me
						</h1>

						<p className="text-primary500 text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
							{text}
							<Cursor cursorColor='#A38BBF' cursorBlinking={false} />
						</p>
					</div>
				</div>

				<button
					className="flex items-center text-sm lg:text-lg space-x-2 bg-primary500 hover:cursor-pointer hover:bg-primary600 hover:scale-105
						text-gray-100 px-4 py-3 lg:px-6 lg:py-6 rounded-full transition duration-200"
					onClick={handleClick}
				>
					<span className="font-medium">Get Started</span>
					<ArrowRight size={20} />
				</button>

			</div>
		</motion.div>
	);
}

export default HomePage;