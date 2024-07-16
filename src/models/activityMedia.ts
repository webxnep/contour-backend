import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ActivityDocument } from "./activity.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ActivityMediaInput {
  image: string;
  activity: ActivityDocument["_id"];
}

export interface ActivityMediaDocument extends ActivityMediaInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const activityMediaSchema = new mongoose.Schema(
  {
    activityMediaId: {
      type: String,
      required: true,
      unique: true,
      default: () => `activityMedia_${nanoid()}`,
    },
    image: { type: String, required: true },
    activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  },
  {
    timestamps: true,
  }
);

const ActivityMediaModel = mongoose.model<ActivityMediaDocument>("ActivityMedia", activityMediaSchema);

export default ActivityMediaModel;
