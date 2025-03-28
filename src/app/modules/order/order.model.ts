import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  orderedItemIds: string[];
  userEmail: string;
  status: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderedItemIds: {
      type: [String],
      required: true,
      validate: {
        validator: (arr: string[]) => arr.length > 0,
        message: 'orderedItemIds must contain at least one item',
      },
    },
    userEmail: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => /\S+@\S+\.\S+/.test(email),
        message: 'Invalid email format',
      },
    },
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered'],
      default: 'processing',
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
