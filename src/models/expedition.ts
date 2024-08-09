import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { CollectionDocument } from "./collection.model";
import { CategoryDocument } from "./category.model";
import { any } from "zod";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ExpeditionInput {
  name: string;
  subheading?: string;
  tripcode?: string;
  overview?: string;
  banner?: string;
  collections: CollectionDocument["_id"];
  category: CategoryDocument["_id"];
  slug?: string;
  routeMap?: string;
  season?: string;
  maxElevation?: string;
  accomodation?: string;
  duration?: number;
  physical?: string;
  activity?: string;
  groupSize?: string;

  promoCode?: {
    code?: string;
    percentage?: number;
    amount?: number;
    isActive?: boolean;
    expiration?: Date;
  };

  // walkingPerDay?: string;
  //
  // bestSeason?: string;
  //

  // description?: string;
  //
  // country?: string;
  //

  //
  // age?: string;
  // location?: string;

  // type?: string;
  // isUpcoming?: string;
  isUpcoming?: boolean;
  isBestseller?: boolean;
  showInHero?: boolean;
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
    season: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    collections: { type: mongoose.Schema.Types.ObjectId, ref: "Collections" },
    banner: { type: String },
    routeMap: { type: String },
    slug: { type: String, unique: true },
    maxElevation: { type: String },
    duration: { type: Number },

    accomodation: { type: String },

    groupSize: { type: String },

    activity: { type: String },
    physical: { type: String },

    promoCode: {
      code: { type: String },
      percentage: { type: Number },
      amount: { type: Number },
      isActive: { type: Boolean },
      expiration: { type: Date },
    },
    price: {
      adult: {
        pricePerAdult: { type: Number },
        discountsA: [{
          minQuantity: { type: Number },
          maxQuantity: { type: Number },
          price: { type: Number }
        }],
      },
      children: {
        pricePerChildren: { type: Number },
        discountsC: [{
          minQuantity: { type: Number },
          maxQuantity: { type: Number },
          price: { type: Number }
        }],
      }
    },

    // age: { type: String },
    // location: { type: String },
    // routeMap: { type: String },
    // type: { type: String },
    // displayMeter: { type: String },

    isUpcoming: { type: Boolean, default: false },

    showInHero: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    
  }
);

const ExpeditionModel = mongoose.model<ExpeditionDocument>("Expedition", expeditionSchema);

export default ExpeditionModel;
