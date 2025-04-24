import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import recommendRoute from './routes/recommend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: ['http://localhost:5173'],
	methods: ['POST'],
	allowedHeaders: ['Content-Type'],
	credentials: false,
};

// Middleware
app.use(express.json())
app.use(cors(corsOptions));

// Routes
app.use('/api/recommend', recommendRoute);

app.get('/', (_req: Request, res: Response) => {
	res.send("Hello World");
});

// Error handling
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: 'Something went wrong', message: err.message });
})

app.listen(PORT, () => console.log(`listening on localhost ${PORT}`));