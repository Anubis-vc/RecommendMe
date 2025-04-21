import { Router } from 'express';
// import util from '../utils'

const router = Router();

router.post('/', async (req, res) => {
	const { mediaType, similarMedia, mood } = req.body;

	res.send(`${mediaType}, ${similarMedia}, ${mood}`)
})

export default router;