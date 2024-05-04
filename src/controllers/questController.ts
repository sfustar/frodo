import { Request, Response } from 'express';
import { QuestClaimDtoSchema } from '../validators/questClaimDto';
import { HttpException } from '../utils/exceptions';
import { logger } from '../utils/logger';
import { isAccessSatisfied, scoreCalculator, isQuestClaimed, claimQuest } from '../services/questService';

export const questClaim = async (req: Request, res: Response) => {
  const { success, error, data } = QuestClaimDtoSchema.safeParse(req.body);

  if (!success) {
    logger.error(error);
    throw new HttpException(400, 'Invalid request body');
  }

  const isClaimedAlready = await isQuestClaimed(data);
  if (isClaimedAlready) {
    logger.info('Quest already claimed');
    return res.json({ status: 'failed', score: 0 });
  }

  const isSatisfied = isAccessSatisfied(data);
  if (!isSatisfied) {
    logger.info('Access conditions not satisfied');
    return res.json({ status: 'failed', score: 0 });
  }

  const score = scoreCalculator(data.submission_text);
  if (score < 5) {
    logger.info('Score is less than 5');
    return res.json({ status: 'failed', score });
  }

  await claimQuest(data);
  logger.info('Quest claimed successfully');
  return res.json({ score, status: 'success' });
};
