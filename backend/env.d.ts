declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GPT_APT_KEY: string;
			MODEL: string;
		}
	}
}

export {};