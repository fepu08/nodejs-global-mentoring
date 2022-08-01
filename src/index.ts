import express from 'express';
import userRoutes from './routes/user-routes';
import { handleError, handleNotFound } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

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
