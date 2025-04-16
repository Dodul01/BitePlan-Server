// New Code
import mongoose, { Schema, Document } from 'mongoose';

const MealSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    prepTime: String,
    servings: Number,
    rating: Number,
    cuisine: String,
    cuisineOptions: String,
    dietaryInfo: [String],
    dietaryOptions: String,
    tags: [String],
    busisnessName: String,
    createdAt: String,
    updatedAt: String,
    __v: Number,
  },
  { _id: false },
);

const OrderedItemSchema = new Schema(
  {
    meal: { type: MealSchema, required: true },
    customization: { type: String },
    schedule: { type: String },
  },
  { _id: false },
);

const CardSchema = new Schema(
  {
    brand: String,
    display_brand: String,
    country: String,
    exp_month: Number,
    exp_year: Number,
    funding: String,
    last4: String,
    regulated_status: String,
    wallet: { type: Schema.Types.Mixed, default: null },
  },
  { _id: false },
);

const PaymentMethodSchema = new Schema(
  {
    id: String,
    type: String,
    card: { type: CardSchema, required: false },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    _id: String,
    name: String,
    email: String,
    phone: String,
    role: String,
    busisnessName: String,
    cuisineSepcialties: String,
    deliveryAddress: String,
    iat: Number,
    exp: Number,
  },
  { _id: false },
);

interface IOrder extends Document {
  orderedItemIds: {
    meal: typeof MealSchema;
    customization: string;
    schedule: string;
  }[];
  user: typeof UserSchema;
  paymentMethod?: typeof PaymentMethodSchema;
  status: 'processing' | 'shipped' | 'delivered';
}

const OrderSchema = new Schema<IOrder>(
  {
    orderedItemIds: {
      type: [OrderedItemSchema],
      required: true,
    },
    user: {
      type: UserSchema,
      required: true,
    },
    paymentMethod: {
      type: PaymentMethodSchema,
      required: false,
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

// Old code
// import mongoose, { Schema, Document } from 'mongoose';

// interface IOrder extends Document {
//   orderedItemIds: string[];
//   userEmail: string;
//   status: string;
// }

// const OrderSchema = new Schema<IOrder>(
//   {
//     orderedItemIds: {
//       type: [String],
//       required: true,
//       validate: {
//         validator: (arr: string[]) => arr.length > 0,
//         message: 'orderedItemIds must contain at least one item',
//       },
//     },
//     userEmail: {
//       type: String,
//       required: true,
//       validate: {
//         validator: (email: string) => /\S+@\S+\.\S+/.test(email),
//         message: 'Invalid email format',
//       },
//     },
//     status: {
//       type: String,
//       enum: ['processing', 'shipped', 'delivered'],
//       default: 'processing',
//     },
//   },
//   { timestamps: true },
// );

// export const Order = mongoose.model<IOrder>('Order', OrderSchema);
