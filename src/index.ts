import express from 'express';
import userRoutes from './routes/user-routes';
import { handleError, handleNotFound } from './middlewares/error-handler';
import groupRouter from './routes/group-routes';
import { apiMethodLoggingMiddleware } from './loggers/api-method-logger';
import { logger } from './loggers/logger';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(apiMethodLoggingMiddleware);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/test/error', (req, res) => {
  throw new Error();
});

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRouter);

app.use(handleNotFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server listens on port: ${port}`);
});

process.on('unhandledRejection', (reason) => {
  logger.error('unhandledRejection', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('UncaughtException:', err.message);
  logger.error(err);
  process.exit(1);
});
