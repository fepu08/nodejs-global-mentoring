import express from 'express';
import userRoutes from './routes/userRoutes';
import { handleError, handleNotFound } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(handleNotFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`Server listens on port: ${port}`);
});

process.on('uncaughtException', (err) => {
  console.error('UncaughtException:', err.message);
  process.exit(1);
});
