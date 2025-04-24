import { Cursor, useTypewriter } from 'react-simple-typewriter'

/*
TODO: BUILD OUT TYPEWRITER WHICH TELLS USERS SOMETHING LIKE:
"RECOMMEND ME A... BOOK MOVIE TV SHOW PODCAST "
*/

const HomePage = () => {
	const [text] = useTypewriter({
		words: ['books', 'movies', 'tv shows', 'podcasts', 'albums', 'anything!'],
		loop: 1,
		typeSpeed: 50,
		deleteSpeed: 60,
		delaySpeed: 2000,
	});

	return (
		<div>
			<h1 className='text-lg md:text-xl lg:text-3xl text-primary900'>
				<span>Recomend me <span className='text-primary500'>{text}</span></span>
				<Cursor cursorColor='#B9A7CF' cursorBlinking={false} />
			</h1>
		</div>
	);
}

export default HomePage;