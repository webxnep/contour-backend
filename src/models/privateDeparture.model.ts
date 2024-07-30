import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";
import { CategoryDocument } from "./category.model";
import { ExpeditionDocument } from "./expedition";
import { number } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface PrivateDepartureInput {
  startDate: Date;
  endDate: Date;
  price: string;
  duration:number;
  previousPrice: string;
  expedition: ExpeditionDocument["_id"];
}

export interface PrivateDepartureDocument extends PrivateDepartureInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const PrivateDepartureSchema = new mongoose.Schema(
  {
    privateDepartureId: {
      type: String,
      required: true,
      unique: true,
      default: () => `privateDeparture_${nanoid()}`,
    },
    startDate: { type: String, required: true },
    endDate: { type: String },
    price: { type: String },
    duration: { type: Number },
    previousPrice: { type: String },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const PrivateDepartureModel = mongoose.model<PrivateDepartureDocument>("PrivateDeparture", PrivateDepartureSchema);

export default PrivateDepartureModel;
