import { Request, Response } from 'express';
import { QuestClaimDtoSchema } from '../validators/questClaimDto';
import { HttpException } from '../utils/exceptions';
import { logger } from '../utils/logger';

export const questClaim = (req: Request, res: Response) => {
  const { success, error, data } = QuestClaimDtoSchema.safeParse(req.body);

  if (!success) {
    logger.error(error);
    throw new HttpException(400, 'Invalid request body');
  }

  res.json({ ...data });
};
