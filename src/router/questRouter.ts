import { Router } from 'express';
import { questClaim } from '../controllers/questController';

const questRouter = Router();

questRouter.post('/claim', questClaim);

export { questRouter };
