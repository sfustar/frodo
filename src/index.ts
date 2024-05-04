import express from 'express';
import { initRoutes } from './router';
import { PORT } from './config';
import morgan from 'morgan';
import { ErrorMiddleware } from './middlewares/errorMiddleware';
import { logger } from './utils/logger';

const app = express();
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initRoutes(app);

app.use(ErrorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
