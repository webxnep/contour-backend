import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface CollectionInput {
  name: string;
  image?: string;
  description?: string;
  slug?: string;
}

export interface CollectionDocument extends CollectionInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new mongoose.Schema(
  {
    collectionId: {
      type: String,
      required: true,
      unique: true,
      default: () => `collection_${nanoid()}`,
    },
    name: { type: String, required: true },
    image: { type: String},
    slug: { type: String,unique:true},
    description: { type: String},
  },
  {
    timestamps: true,
  }
);

const CollectionModel = mongoose.model<CollectionDocument>("Collections", CollectionSchema);

export default CollectionModel;
