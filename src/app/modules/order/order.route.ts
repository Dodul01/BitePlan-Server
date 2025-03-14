import express from 'express';
import auth from '../../middleware/auth';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/order-meal', auth('customer'), OrderController.createOrder);
router.get('/get-orders/:email', auth('customer', 'seller'), OrderController.getOrders);

export const OrderRouter = router;
