import { Express } from 'express';
import { rootRouter } from './rootRouter';

export const initRoutes = (app: Express) => {
  //   app.use(Routes.USER, userRouter);
  app.use('/', rootRouter);
};
