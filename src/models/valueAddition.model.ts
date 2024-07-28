import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ValueAdditionInput {
  title: string;
  shortDescription: string;
  expedition: ExpeditionDocument["_id"];
  image?:string[];
  documents?:string[];
}

export interface ValueAdditionDocument extends ValueAdditionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const valueAdditionSchema = new mongoose.Schema(
  {
    valueAdditionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `cost_exclude_${nanoid()}`,
    },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    image: { type: Array(String) },
    documents: { type: Array(String) },
    expedition: { type: mongoose.Schema.Types.ObjectId, ref: "Expedition" },
  },
  {
    timestamps: true,
  }
);

const ValueAdditionModel = mongoose.model<ValueAdditionDocument>("ValueAddition", valueAdditionSchema);

export default ValueAdditionModel;
