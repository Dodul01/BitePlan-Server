import { Request, Response } from 'express';
import { orderValidation } from './order.validation';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParseOrder = orderValidation.orderValidationSchema.parse(order);
    const result = await OrderService.createOrderIntoDB(zodParseOrder);
    
    res.status(200).send({
      success: true,
      message: 'Meal Ordered successfully.',
      result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      statusCode: 400,
      error: error,
      stack: (error as Error).stack,
    });
  }
};

export const OrderController = {
  createOrder,
};
