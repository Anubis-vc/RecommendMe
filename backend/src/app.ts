import express, { Request, Response } from 'express'
// const cors = require('cors');

import router from './routes/mainRoutes';

const app = express();
const PORT = process.env.port || 3000;

app.use('/users', router)

app.get('/', (req:Request, res:Response) => {
	res.send('hello world');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});