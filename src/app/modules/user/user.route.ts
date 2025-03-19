import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/create-user', UserControllers.createUser);
router.get(
  '/get-user/:email',
  auth('customer', 'seller'),
  UserControllers.getUser,
);
router.put(
  '/update-user/:email',
  auth('customer', 'seller'),
  UserControllers.updateUser,
);

export const UserRouter = router;
