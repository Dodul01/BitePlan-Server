import express from 'express';
import auth from '../../middleware/auth';
import { OrderController } from './order.controller';

const router = express.Router();

// TODO: getting error invalid token


router.post('/order-meal', auth('customer'), OrderController.createOrder);

export const OrderRouter = router;
