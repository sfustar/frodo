import type { Config } from 'drizzle-kit';
import { DB_PATH } from './src/config';

export default {
  schema: './src/db/schema.ts',
  driver: 'better-sqlite',
  dbCredentials: {
    url: DB_PATH as string,
  },
} satisfies Config;
