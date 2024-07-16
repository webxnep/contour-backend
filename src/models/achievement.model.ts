import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { TeamDocument } from "./team.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface AchievementInput {
  image: string;
  team: TeamDocument["_id"];
}

export interface AchievementDocument extends AchievementInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const achievementSchema = new mongoose.Schema(
  {
    achievementId: {
      type: String,
      required: true,
      unique: true,
      default: () => `achievement_${nanoid()}`,
    },
    image: { type: String, required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  },
  {
    timestamps: true,
  }
);

const AchievementModel = mongoose.model<AchievementDocument>("Achievement", achievementSchema);

export default AchievementModel;
