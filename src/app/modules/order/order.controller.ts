import { Request, Response } from 'express';
import { orderValidation } from './order.validation';
import { OrderService } from './order.service';
// import { OrderedItem, OrderPayload } from './order.interface';

// New code
    // const order = req.body;
    // // body thake customization data and schedule paitache
    // const zodParseOrder = orderValidation.orderValidationSchema.parse(order);
    // console.log(zodParseOrder);

    // const transformedItems: OrderedItem[] = zodParseOrder.orderedItemIds.map(
    //   (item) => ({
    //     mealId: item.meal._id,
    //     customization: item.customization,
    //     schedule: item.schedule,
    //   }),
    // );

    // const orderPayload: OrderPayload = {
    //   orderedItemIds: transformedItems,
    //   user: zodParseOrder.user,
    //   paymentMethod: zodParseOrder.paymentMethod,
    // };

    // // console.log(transformedItems);
    // const result = await OrderService.createOrderIntoDB(orderPayload);

    // res.status(200).send({
    //   success: true,
    //   message: 'Meal Ordered successfully.',
    //   result,
    // });


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
    console.log(error);
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
