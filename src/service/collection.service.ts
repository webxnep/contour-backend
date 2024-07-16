import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CollectionModel, { CollectionDocument, CollectionInput } from "../models/collection.model";

export async function createCollection(input: CollectionInput) {
  const result = await CollectionModel.create(input);
  return result;
}

export async function findCollection(query: FilterQuery<CollectionDocument>, options: QueryOptions = { lean: true }) {
  const result = await CollectionModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateCollection(query: FilterQuery<CollectionDocument>, update: UpdateQuery<CollectionDocument>, options: QueryOptions) {
  return CollectionModel.findOneAndUpdate(query, update, options);
}

export async function deleteCollection(query: FilterQuery<CollectionDocument>) {
  return CollectionModel.deleteOne(query);
}

export async function findAllCollection() {
  const result = await CollectionModel.find().sort({ createdAt: -1 }); 
  return result;
}
