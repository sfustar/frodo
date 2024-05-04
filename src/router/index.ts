import { Express } from 'express';
import { rootRouter } from './rootRouter';
import { questRouter } from './questRouter';

export const initRoutes = (app: Express) => {
  app.use('/', rootRouter);
  app.use('/quest', questRouter);
};
