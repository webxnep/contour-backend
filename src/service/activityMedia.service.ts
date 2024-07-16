import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ActivityMediaModel, { ActivityMediaInput, ActivityMediaDocument } from "../models/activityMedia";

export async function createActivityMedia(input: ActivityMediaInput) {
  const result = await ActivityMediaModel.create(input);
  return result;
}

export async function findActivityMedia(query: FilterQuery<ActivityMediaDocument>, options: QueryOptions = { lean: true }) {
  const result = await ActivityMediaModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateActivityMedia(query: FilterQuery<ActivityMediaDocument>, update: UpdateQuery<ActivityMediaDocument>, options: QueryOptions) {
  return ActivityMediaModel.findOneAndUpdate(query, update, options);
}

export async function deleteActivityMedia(query: FilterQuery<ActivityMediaDocument>) {
  return ActivityMediaModel.deleteOne(query);
}

export async function findAllActivityMedia() {
  const result = await ActivityMediaModel.find().sort({ createdAt: -1 }); 
  return result;
}

export async function findActivityMediaByTeam(query: FilterQuery<ActivityMediaDocument>, options: QueryOptions = { lean: true }) {
  const results = await ActivityMediaModel.find(query, {}, options).sort({ createdAt: -1 }); 
  return results;
}
