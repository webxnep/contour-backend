import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface TeamInput {
  name: string;
  image: string;
  bioData: string;
  position: string;
  description: string;
  phone?: string;
  order: string;

  linkedin?: string;
  x?: string;
  insta?: string;
  facebook?: string;

  isBoardMember: string;
}

export interface TeamDocument extends TeamInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
      default: () => `team_${nanoid()}`,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    bioData: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String },

    order: { type: String, required: true, unique: true },

    linkedin: { type: String },
    facebook: { type: String },
    x: { type: String },
    insta: { type: String },

    isBoardMember: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const TeamModel = mongoose.model<TeamDocument>("Team", teamSchema);

export default TeamModel;
