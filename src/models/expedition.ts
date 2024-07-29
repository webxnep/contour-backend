import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";
import { CategoryDocument } from "./category.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ExpeditionInput {
  name: string;
  subheading?: string;
  tripcode?:string;
  overview?:string;
  banner?: string;
  collections: CollectionDocument["_id"];
  category: CategoryDocument["_id"];
  slug?: string;
  routeMap?: string;

  // meter?: string;
  // displayMeter?: string;
  // winter?: string;
  // autumn?: string;
  // summer?: string;
  // spring?: string;
  

  // maxElevation?: string;
  // walkingPerDay?: string;
  // accomodation?: string;
  // bestSeason?: string;
  // groupSize?: string;

  // description?: string;
  // duration?: string;
  // country?: string;
  // activity?: string;
  // physical?: string;
  // age?: string;
  // location?: string;


  // type?: string;
  // isUpcoming?: string;
   isUpcoming?: boolean;
 
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
    subheading: { type: String },
    tripcode: { type: String },
    overview: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    collections: { type: mongoose.Schema.Types.ObjectId, ref: "Collections" },
    banner: { type: String },
    routeMap: { type: String },
    slug: { type: String },
    
    // winter: { type: String },
    // autumn: { type: String },
    // summer: { type: String },
    // spring: { type: String },
    // maxElevation: { type: String },
    // walkingPerDay: { type: String },
    // accomodation: { type: String },
    // bestSeason: { type: String },
    // groupSize: { type: String },
    // description: { type: String },
    // duration: { type: String },
    // country: { type: String },
    // activity: { type: String },
    // physical: { type: String },
    // age: { type: String },
    // location: { type: String },
    // routeMap: { type: String },
    // type: { type: String },
    // meter: { type: String },
    // displayMeter: { type: String },
   
    // isUpcoming: { type: String, default: "no" },
    isUpcoming: { type: Boolean, default: false },
   
  },
  {
    timestamps: true,
  }
);

const ExpeditionModel = mongoose.model<ExpeditionDocument>("Expedition", expeditionSchema);

export default ExpeditionModel;
