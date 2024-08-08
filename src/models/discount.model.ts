import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface DiscountInput {
  discountRate: number;
  lowerLimit: number;
  upperLimit: number;
  
}

export interface DiscountDocument extends DiscountInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const discountSchema = new mongoose.Schema(
  {
    discountId: {
      type: String,
      required: true,
      unique: true,
      default: () => `blog_${nanoid()}`,
    },
    lowerLimit: { type: Number, required: true },
    upperLimit: { type: Number, required: true },
   
    discountRate: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

const DiscountModel = mongoose.model<DiscountDocument>("Discount", discountSchema);

export default DiscountModel;
