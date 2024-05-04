import { Router } from 'express';
import { healthCheck } from '../controllers/healthCheckController';

const rootRouter = Router();

rootRouter.get('/health', healthCheck);

export { rootRouter };
