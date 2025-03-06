import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  orderedItemIds: string[];
}

const OrderSchema = new Schema<IOrder>({
  orderedItemIds: {
    type: [String],
    required: true,
    validate: {
      validator: (arr: string[]) => arr.length > 0,
      message: 'orderedItemIds must contain at least one item',
    },
  },
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);

