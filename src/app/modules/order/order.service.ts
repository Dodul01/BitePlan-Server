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

  // Old one

  // const mailOptions = {
  //   from: 'allendodul6@gmail.com',
  //   to: email,
  //   subject: 'Order Confirmation - Invoice',
  //   text: `Thank you for your order! Your payment of $${orderData.totalAmount} has been successfully processed.
  //   Order ID: ${orderData.orderId}
  //   Items:
  //   ${orderData.items.map((item: any) => `${item.name} (x${item.quantity}) - $${item.price}`).join('\n')}`,
  // };

  const total = orderData.items
    .reduce((sum: number, item: any) => sum + item.price, 0)
    .toFixed(2);

  // New one
  const mailOptions = {
    from: 'allendodul6@gmail.com',
    to: email,
    subject: 'MealBox Order Confirmation - Invoice',
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #44C356; color: #ffffff; padding: 20px;">
          <h2 style="margin: 0;">Thanks for ordering, ${orderData.customerName || 'Customer'}!</h2>
          <p style="margin: 5px 0 0;">Here’s your receipt for MealBox.</p>
        </div>
  
        <div style="padding: 20px;">
          <h3 style="margin-top: 0; color: #333;">Total Paid</h3>
          <p style="font-size: 24px; font-weight: bold; color: #44C356;">$${total}</p>
  
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f0f0; border-left: 5px solid #44C356;">
            <strong>Order ID:</strong> ${orderData.orderId}<br/>
            <strong>Date:</strong> ${new Date().toLocaleDateString()}
          </div>
  
          <!-- Updated Items Section -->
          <h4 style="margin-top: 30px;">Your Meals</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${orderData.items
              .map(
                (item: any) => `
              <li style="display: flex; align-items: center; margin-bottom: 15px;">
                <div>
                  <p style="margin: 0; font-weight: 600;">${item.name}</p>
                  <p style="margin: 3px 0 0; color: #555;">
                    $${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            `,
              )
              .join('')}
          </ul>
  
          <div style="margin-top: 30px;">
            <p><strong>Payment Method:</strong> Mastercard •••• ${orderData.cardLast4 || '****'}</p>
            <p style="color: #888;">Your order is in processing.</p>
          </div>
  
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://mealbox-client-red.vercel.app/find-meals" style="background-color: #44C356; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px;">
              Find Your Favorit meal
            </a>
          </div>
        </div>
  
        <div style="background-color: #000; color: #fff; text-align: center; padding: 15px; font-size: 14px;">
          MealBox • Personalized Meal Planning & Delivery
        </div>
      </div>
    </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending invoice email:', error);
  }
};

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
        quantity: 1,
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
