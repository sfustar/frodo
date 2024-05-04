import { z } from 'zod';

// discordRoleSchema
const DiscordRoleAccessSchema = z.object({
  type: z.literal('discordRole'),
  operator: z.enum(['contains', 'notContains']),
  value: z.string(),
});

// dateSchema
const DateAccessSchema = z.object({
  type: z.literal('date'),
  operator: z.enum(['>', '<']),
  value: z.string().datetime({ offset: true }),
});

// levelSchema
const LevelAccessSchema = z.object({
  type: z.literal('level'),
  operator: z.enum(['>', '<']),
  value: z
    .string()
    .transform(val => parseInt(val))
    .refine(val => !isNaN(val) && val > 0),
});

export const QuestClaimDtoSchema = z.object({
  questId: z.string().uuid(),
  userId: z.string().uuid(),
  claimed_at: z.string().datetime({ offset: true }),
  access_condition: z.array(z.union([DiscordRoleAccessSchema, DateAccessSchema, LevelAccessSchema])),
  user_data: z.object({
    completed_quests: z.array(z.string().uuid()),
    discordRoles: z.array(z.string()),
    level: z.number().positive(),
  }),
  submission_text: z.string(),
});

export type QuestClaimDto = z.infer<typeof QuestClaimDtoSchema>;
export type LevelAccess = z.infer<typeof LevelAccessSchema>;
export type DateAccess = z.infer<typeof DateAccessSchema>;
export type DiscordRoleAccess = z.infer<typeof DiscordRoleAccessSchema>;
