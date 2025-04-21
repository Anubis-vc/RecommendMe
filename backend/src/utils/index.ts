import { OpenAI } from 'openai';

const util = new OpenAI({
	apiKey: process.env.GPT_API_KEY,
});

export default util;