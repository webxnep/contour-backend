import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ExpeditionDocument } from "./expedition";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ActivityInput {
  name: string;
  image: string;
  description: string;
}

export interface ActivityDocument extends ActivityInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
      unique: true,
      default: () => `activity_${nanoid()}`,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ActivityModel = mongoose.model<ActivityDocument>("Activity", activitySchema);

export default ActivityModel;
