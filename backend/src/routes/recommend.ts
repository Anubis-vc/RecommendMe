import { Router, Request, Response } from 'express';
// import NodeCache from 'node-cache';
import getRecommendations from '../utils/getRecs';
import { buildMessages } from '../utils/msg';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
	const { mediaType, similarMedia, mood } = req.body;

	if (!mediaType && !similarMedia && !mood) {
		res.status(400).json({ error: 'Missing required fields' });
	}

	else {
		const messages = buildMessages(mediaType, similarMedia, mood);

		const recs = await getRecommendations(messages);
		if (!recs || recs.length == 0) {
			res.status(500).json({ error: "Could not get recommendations" });
		}
		else {
			res.json({ recs });
		}
	}
});

export default router;