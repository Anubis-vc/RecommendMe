import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import recommendRoute from './routes/recommend';

dotenv.config();

const app = express();
const PORT = process.env.port || 3000;

app.use(express.json())
app.use('/api/recommend', recommendRoute);

app.get('/', (req: Request, res: Response) => {
	res.send("Hello World");
})

app.listen(PORT, () => console.log(`listening on localhost ${PORT}`));