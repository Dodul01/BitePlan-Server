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

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const allOrders = await OrderService.getOrdersFromDB(email);

    res.send({
      status: true,
      message: 'All Order Retrived successfully',
      data: {
        allOrders,
      },
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await OrderService.updateOrderStatusFromDB(id, data);

    res.send({
      status: true,
      message: 'Status updated successfully.',
      data: result,
    });
  } catch (error) {
    res.send({
      status: false,
      message: 'Something went wrong!',
      error,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
