import { Request, Response, Router } from 'express';
import { healthCheck } from '../controllers/healthCheckController';

const rootRouter = Router();

rootRouter.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

rootRouter.get('/health', healthCheck);

export { rootRouter };
