import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";
import { CategoryDocument } from "./category.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ExpeditionInput {
  name: string;
  heading?: string;
  tripcode?:string;
  overview?:string;
  banner?: string;
  collections: CollectionDocument["_id"];
  category: CategoryDocument["_id"];
  slug?: string;


  meter?: string;
  displayMeter?: string;
  winter?: string;
  autumn?: string;
  summer?: string;
  spring?: string;
  

  maxElevation?: string;
  walkingPerDay?: string;
  accomodation?: string;
  bestSeason?: string;
  groupSize?: string;

  description?: string;
  duration?: string;
  country?: string;
  activity?: string;
  physical?: string;
  age?: string;
  location?: string;

  routeMap?: string;
  type?: string;
  isUpcoming?: string;
  fixedDepartures?: boolean;
 
}

export interface ExpeditionDocument extends ExpeditionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const expeditionSchema = new mongoose.Schema(
  {
    expeditionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `expedition_${nanoid()}`,
    },
    name: { type: String, required: true },
    heading: { type: String },
    meter: { type: String },
    displayMeter: { type: String },
    banner: { type: String },
    winter: { type: String },
    autumn: { type: String },
    summer: { type: String },
    spring: { type: String },
    maxElevation: { type: String },
    walkingPerDay: { type: String },
    accomodation: { type: String },
    bestSeason: { type: String },
    groupSize: { type: String },
    description: { type: String },
    duration: { type: String },
    country: { type: String },
    activity: { type: String },
    physical: { type: String },
    age: { type: String },
    location: { type: String },
    routeMap: { type: String },
    type: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    collections: { type: mongoose.Schema.Types.ObjectId, ref: "Collections" },
    isUpcoming: { type: String, default: "no" },
    fixedDepartures: { type: Boolean, default: false },
    slug: { type: String },
  },
  {
    timestamps: true,
  }
);

const ExpeditionModel = mongoose.model<ExpeditionDocument>("Expedition", expeditionSchema);

export default ExpeditionModel;
