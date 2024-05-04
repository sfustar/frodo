import { QuestClaimDto, DiscordRoleAccess, DateAccess, LevelAccess } from '../validators/questClaimDto';
import { db } from '../db/index';
import { quests } from '../db/schema';
import { and, eq } from 'drizzle-orm';

export function isDiscordRoleAccessSatisfied(discordRoleAccess: DiscordRoleAccess, discordRoles: string[]): boolean {
  switch (discordRoleAccess.operator) {
    case 'contains':
      return discordRoles.includes(discordRoleAccess.value);
    case 'notContains':
      return !discordRoles.includes(discordRoleAccess.value);
  }
}

export function isDateAccessSatisfied(dateAccess: DateAccess, claimedAt: string): boolean {
  switch (dateAccess.operator) {
    case '>':
      return claimedAt > dateAccess.value;
    case '<':
      return claimedAt < dateAccess.value;
  }
}

export function isLevelAccessSatisfied(levelAccess: LevelAccess, level: number): boolean {
  switch (levelAccess.operator) {
    case '>':
      return level > levelAccess.value;
    case '<':
      return level < levelAccess.value;
  }
}

export function isAccessSatisfied(questClaimDto: QuestClaimDto): boolean {
  const {
    access_condition,
    user_data: { level, discordRoles },
    claimed_at,
  } = questClaimDto;
  return access_condition.every(accessCondition => {
    switch (accessCondition.type) {
      case 'discordRole':
        return isDiscordRoleAccessSatisfied(accessCondition, discordRoles);
      case 'date':
        return isDateAccessSatisfied(accessCondition, claimed_at);
      case 'level':
        return isLevelAccessSatisfied(accessCondition, level);
    }
  });
}

export function scoreCalculator(submissionText: QuestClaimDto['submission_text']): number {
  let score = 0;
  const punctuation = [',', '.', '?', '!'];
  const joyfulWords = ['Joyful', 'Happy', 'Vibrant', 'Thrilled', 'Euphoric', 'Cheerful', 'Delighted'];

  if (submissionText.length > 0) {
    if (submissionText.split('').filter(char => punctuation.includes(char)).length === 1) {
      score += 1;
    }

    score += submissionText
      .split(' ')
      .filter(word => joyfulWords.includes(word))
      .slice(0, 3).length;

    if (containsRepetitiveSequence(submissionText)) {
      score += 2;
    }
  }

  return score;
}

// TO DO: Might have some false positives, needs to be fixed and needs more examples of repetitive sequences
function containsRepetitiveSequence(str: string) {
  const pattern = /(.+)(\1{1,})/;

  return pattern.test(str);
}

export async function isQuestClaimed({ userId, questId }: QuestClaimDto) {
  const claimedQuests = await db
    .select()
    .from(quests)
    .where(and(eq(quests.id, questId), eq(quests.userId, userId)));

  return claimedQuests.length > 0;
}

export function claimQuest({ userId, questId }: QuestClaimDto) {
  return db.insert(quests).values({ id: questId, userId });
}
