import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const quests = sqliteTable('quests', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull(),
});
