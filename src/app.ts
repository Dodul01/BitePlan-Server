import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.route';

const app: Application = express();

//Parser
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// Application Router
app.use('/api/users', UserRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running.' });
});

export default app;
