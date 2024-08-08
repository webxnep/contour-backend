import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BookingInput {
  fullName: string;
  phone: number;
  postalCode: number;
  dob: Date;
  adults: number;
  childrens: number;
  note?: string;
  // isTransportation: boolean;
  // isInsurance: boolean;
  paymentMethod: string;
  paymentStatus: string;
  startDate: Date;
  endDate: Date;
  expedition: ExpeditionDocument["_id"];
  user: UserDocument["_id"];

  emergencyName?: string;
  emergencyPhone?: number;
  emergencyRelationship?: string;
  paymentOption: "full-payment" | "deposit-payment";
  paymentId?: string;
  totalAmount?: number;
  depositAmount?: number;
  remainingAmount?: number;
  additionalServices?: string[];
}

export interface BookingDocument extends BookingInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => `booking_${nanoid()}`,
    },
    fullName: { type: String, required: true },

    phone: { type: Number, required: true },
    postalCode: { type: Number, required: true },
    dob: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    adults: { type: Number, required: true },
    childrens: { type: Number, required: true },
    note: { type: String },
    // isTransportation: { type: Boolean, required: true },
    // isInsurance: { type: Boolean, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    emergencyName: { type: String, required: false },
    emergencyPhone: { type: Number, required: false },
    emergencyRelationship: { type: String, required: false },
    paymentId: { type: String, required: false },
    totalAmount: { type: Number, required: true },
    depositAmount: { type: Number, required: false },
    remainingAmount: { type: Number, required: false },
    additionalServices: { type: [String], required: false },

    paymentOption: {
      type: String,
      required: true,
      enum: ["full-payment", "deposit-payment"],
    },

    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model<BookingDocument>("Booking", BookingSchema);

export default BookingModel;
