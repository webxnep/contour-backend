import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ReviewInput {
  message: string;
  rating: number;
  like: number;
  isVerified?:boolean;
  user: UserDocument["_id"];
}

export interface Review extends ReviewInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      required: true,
      unique: true,
      default: () => `review_${nanoid()}`,
    },
    message: { type: String, required: true },
    expedition: { type: String, required: true },
    rating: { type: Number, required: true },
    isVerified: { type: Boolean, required: false,default:false },
    // guide: { type: String, required: true},
    like:{ type: Number, required: true},
    user: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.model<Review>("Review", reviewSchema);

export default ReviewModel;
