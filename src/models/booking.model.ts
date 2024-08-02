// import mongoose from "mongoose";
// import { customAlphabet } from "nanoid";
// import { ExpeditionDocument } from "./expedition";
// import { ActivityDocument } from "./activity.model";

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

// export interface emergency {
//   fullName: String;
//   contact: String;
//   relationship: String;
// }

// export const emergencyContactSchema = new mongoose.Schema({
//   fullName: String,
//   contact: String,
//   relationship: String,

// })

// export interface transportation {
//   method: String;
//   transportationCharge: Number;
// }

// export const transportationSchema = new mongoose.Schema({
//   method: String,
//   transportationCharge: Number,
// })

// export interface children {
//   age:Number;
//   no: Number;
// }

// export const childrenSchema = new mongoose.Schema({
//   age:Number,
//   no: Number
// })

// export interface travelInsurance {
//   insurance: Boolean;
//   insuranceCharge: Number;
// }

// export const travelInsuranceSchema = new mongoose.Schema({
//   insurance: Boolean,
//   insuranceCharge: Number,
// })

// export interface price {
//   tripPrice:Number;
//   transportationCharge: Number;
//   insuranceCharge:Number;
//   tax:Number;
//   bankCharge:Number;
//   totalCharge:Number;
// }

// export const priceSchema = new mongoose.Schema({
//   tripPrice:Number,
//   transportationCharge: Number,
//   insuranceCharge:Number,
//   tax:Number,
//   bankCharge:Number,
//   totalCharge:Number
// })

// export interface payment {
//   paymentMethod:String;
//   amountPaid: Number;
// }

// export const paymentSchema = new mongoose.Schema({
//   paymentMethod:String,
//   amountPaid: Number
// })

// export interface BookingInput {
//   fullName: string;
//   email: string;
//   phone: string;
//   dob?: Date;
//   gender?: string;
//   departureDate?: Date;
//   noOfAdults?: number;
//   noOfChildren?:children[];
//   passportNo?: string;
//   emergencyContact?: emergency;
//   transportation?: transportation;
//   travelInsurance?:travelInsurance;
//   price?:price;
//   payment?:payment
//   expedition?: ExpeditionDocument["_id"];
//   package?: string;
//   notes?: string;
//   status?: string;
//   paymentStatus?: string;
//   isSeen?: boolean;
// }

// export interface BookingDocument extends BookingInput, mongoose.Document {
//   createdAt: Date;
//   updatedAt: Date;
// }

// const bookingSchema = new mongoose.Schema(
//   {
//     bookingId: {
//       type: String,
//       required: true,
//       unique: true,
//       default: () => `booking_${nanoid()}`,
//     },
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     noOfAdults: { type: Number},
//     notes: { type: String },
//     package: { type: String },
//     expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
//     status: { type: String, enum: ["active", "canceled"], default: "active" },
//     dob: { type: Date},
//     departureDate: { type: Date},
//     passportNo: { type: String},
//     gender: { type: String},
//     emergencyContact: {
//       type: emergencyContactSchema
//     },
//     noOfChildren: {
//       type: Array(childrenSchema)
//     },
//     transportation: {
//       type: transportationSchema
//     },
//     travelInsurance: {
//       type: travelInsuranceSchema
//     },
//     price: {
//       type: priceSchema
//     },
//     payment: {
//       type: paymentSchema
//     },
//   },

//   {
//     timestamps: true,
//   }
// );

// const BookingModel = mongoose.model<BookingDocument>("Booking", bookingSchema);

// export default BookingModel;

import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface BookingInput {
  fullName: string;
  // phone: number;
  dob: Date;
  adults: number;
  childrens: number;
  note?: string;
  // isTransportation: boolean;
  // isInsurance: boolean;
  paymentMethod: string;
  paymentStatus: string;

  expedition: ExpeditionDocument["_id"];
  user: UserDocument["_id"];

  emergencyName: string;
  emergencyPhone: number;
  emergencyRelationship: string;
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

    // phone: { type: Number, required: true },
    dob: { type: Date, required: true },
    adults: { type: Number, required: true },
    childrens: { type: Number, required: true },
    note: { type: String },
    // isTransportation: { type: Boolean, required: true },
    // isInsurance: { type: Boolean, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    emergencyName: { type: String, required: true },
    emergencyPhone: { type: Number, required: true },
    emergencyRelationship: { type: String, required: true },

    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model<BookingDocument>("Booking", BookingSchema);

export default BookingModel;
