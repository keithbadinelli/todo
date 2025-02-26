import express from 'express';
import { config } from './config/app.config';
import { corsMiddleware, cacheControlMiddleware } from './middleware/common.middleware';
import taskRoutes from './routes/task.routes';

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use(cacheControlMiddleware);

app.use('/tasks', taskRoutes);

app.listen(config.port, config.host, () => {
  console.log(`Server is running on http://${config.host}:${config.port}`);
}); 