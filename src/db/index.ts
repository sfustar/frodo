import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { DB_PATH } from '../config';

const sqlite = new Database(DB_PATH);
export const db = drizzle(sqlite);
