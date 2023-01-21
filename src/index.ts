import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRoutes from './user/user-routes';
import { handleError, handleNotFound } from './middlewares/error-handler';
import groupRouter from './group/group-routes';
import { apiMethodLoggingMiddleware } from './loggers/api-method-logger';
import { logger } from './loggers/logger';
import { jwtMiddleware } from './middlewares/jwt-middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiMethodLoggingMiddleware);
app.use(jwtMiddleware);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRouter);

app.use(handleNotFound);
app.use(handleError);

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('UncaughtException:', err.message);
  logger.error(err);
  process.exit(1);
});

module.exports = app;
