/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meal } from '../meal/meal.model';
import { User } from '../user/user.model';
import { OrderPayload } from './order.interface';
import { Order } from './order.model';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';

// Initialize Stripe with your secret key (make sure to use environment variables for security)
const stripe = new Stripe(
  'sk_test_51PcPm62MP0L90Yjv5rrNJzlct5wUiAmxGXfFWqCdzz5Sjka70yrTPbHFsTjrbXRqs9dSy1Ad4DuduAY6iIOk5I9e00dVeD87uY',
  {
    apiVersion: '2025-02-24.acacia',
  },
);

// Send invoice email to the customer
const sendInvoiceEmail = async (email: string, orderData: any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'allendodul6@gmail.com',
      pass: 'gkbq saom tmxp loll',
    },
  });

  const mailOptions = {
    from: 'allendodul6@gmail.com',
    to: email,
    subject: 'Order Confirmation - Invoice',
    text: `Thank you for your order! Your payment of $${orderData.totalAmount} has been successfully processed.
    Order ID: ${orderData.orderId}
    Items: 
    ${orderData.items.map((item: any) => `${item.name} (x${item.quantity}) - $${item.price}`).join('\n')}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending invoice email:', error);
  }
};

// const createOrderIntoDB = async (order: OrderPayload) => {
//   // console.log(order);

//   try {
//     // STEP 1. Create order entry in the DB (without payment confirmation for now)
//     const newOrder = new Order({
//       orderedItemIds: order.orderedItemIds,
//       paymentMethod: order?.paymentMethod,
//       userEmail: order.user.email,
//       totalAmount: 0,
//     });

//     // Save the order into the DB
//     const savedOrder = await newOrder.save();

//     // 2. Fetch product details based on ordered item IDs
//     const productDetails = await Meal.find({
//       _id: { $in: savedOrder.orderedItemIds },
//     });

//     // 3. Calculate the total amount by multiplying item price with quantity
//     let totalAmount = 0;

//     const itemsWithDetails = savedOrder.orderedItemIds
//       .map((itemId: string) => {
//         const product = productDetails.find(
//           (p: typeof Meal.prototype) => p._id.toString() === itemId.toString(),
//         );
//         const quantity = order.orderedItemIds.filter(
//           (id) => id === itemId,
//         ).length;
//         if (product) {
//           totalAmount += product.price * quantity;
//           return {
//             name: product.name,
//             price: product.price,
//             quantity,
//           };
//         }
//         return null;
//       })
//       .filter((item) => item !== null);

//     // 4. Confirm payment using Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalAmount * 100,
//       currency: 'usd',
//       payment_method: order.paymentMethod?.id,
//       confirm: true,
//       automatic_payment_methods: {
//         enabled: true,
//         allow_redirects: 'never',
//       },
//     });

//     // Check if the payment was successful
//     if (paymentIntent.status === 'succeeded') {
//       // console.log('Payment successful!');

//       // 5. Send the invoice email to the customer
//       await sendInvoiceEmail('mozammelhoquedodul3@gmail.com', {
//         items: itemsWithDetails,
//         orderId: savedOrder._id,
//       });

//       return savedOrder;
//     } else {
//       throw new Error('Payment failed');
//     }
//   } catch (error) {
//     console.log('Error creating order in DB:', error);
//     throw new Error('Error creating order and processing payment.');
//   }
// };

const createOrderIntoDB = async (order: OrderPayload) => {
  try {
    // 1. Calculate total amount from ordered items
    let totalAmount = 0;

    const itemsWithDetails = order.orderedItemIds.map((item) => {
      const { meal } = item;
      totalAmount += meal.price;
      return {
        name: meal.name,
        price: meal.price,
        quantity: 1, // Assuming 1 per item for now
      };
    });

    // 2. Create the order document
    const newOrder = new Order({
      orderedItemIds: order.orderedItemIds, // full items with meal + customization + schedule
      paymentMethod: order.paymentMethod,
      user: order.user,
      status: 'processing',
    });

    const savedOrder = await newOrder.save();

    // 3. Confirm payment using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'usd',
      payment_method: order.paymentMethod?.id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    if (paymentIntent.status === 'succeeded') {
      // 4. Send invoice email
      await sendInvoiceEmail(order.user.email, {
        items: itemsWithDetails,
        orderId: savedOrder._id,
      });

      return savedOrder;
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    console.error('Error creating order in DB:', error);
    throw new Error('Error creating order and processing payment.');
  }
};

const getOrdersFromDB = async (email: string) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    let orders: any[] = [];

    if (user.role === 'customer') {
      // Fetch orders for the customer by email
      orders = await Order.find({ 'user.email': email }).exec();
    } else if (user.role === 'seller') {
      const allMeals = await Meal.find({ busisnessName: user.busisnessName });
      const mealIds = allMeals.map((meal: typeof Meal.prototype) =>
        meal._id.toString(),
      );

      orders = await Order.find({
        'orderedItemIds.meal._id': { $in: mealIds },
      });
    } else {
      throw new Error('Invalid role');
    }

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

const updateOrderStatusFromDB = async (id: string, data: any) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true },
  );
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  updateOrderStatusFromDB,
};
