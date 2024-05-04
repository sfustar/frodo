import { config } from 'dotenv';

config({ path: `.env.development` });

export const { DB_PATH, PORT } = process.env;
