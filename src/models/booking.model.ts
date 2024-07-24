import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { ActivityDocument } from "./activity.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BookingInput {
  fullName: string;
  email: string;

  phone: string;

  expedition?: ExpeditionDocument["_id"];
  package?: string;


  notes?: string;
  status?: string;
  paymentStatus?: string;
  isSeen?: boolean;
}

export interface BookingDocument extends BookingInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => `booking_${nanoid()}`,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    // pCode: { type: String, required: true },
    phone: { type: String, required: true },
    // pNationality: { type: String, required: true },
    // pPassportNo: { type: String, required: true },
    // pDob: { type: String, required: true },
    // departureDate: { type: String, required: true },
    noOfTravelers: { type: Number, required: true },
    price: { type: Number, required: true },
    // tripDuration: { type: Number, required: true },
    notes: { type: String },
    package: { type: String },

    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    status: { type: String, enum: ["active", "canceled"], default: "active" },
    // paymentStatus: { type: String, enum: ["unpaid", "fullyPaid", "partiallyPaid"], default: "unpaid" },
    // isSeen: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model<BookingDocument>("Booking", bookingSchema);

export default BookingModel;
