import { OrderPayload } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (order: OrderPayload) => {
  const result = await Order.create(order);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
};
