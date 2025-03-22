import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.route';
import { AuthRouter } from './app/modules/auth/auth.route';
import { MealRouter } from './app/modules/meal/meal.route';
import { OrderRouter } from './app/modules/order/order.route';
import { PreferenceRouter } from './app/modules/preference/preference.route';

const app: Application = express();

//Parser
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

// Application Router
app.use('/api/users', UserRouter);
app.use('/api/', AuthRouter);
app.use('/api/', MealRouter);
app.use('/api/', OrderRouter);
app.use('/api/', PreferenceRouter);

app.get('/', (req: Request, res: Response) => {
  res.send({ status: true, message: 'Server is running.' });
});

export default app;
