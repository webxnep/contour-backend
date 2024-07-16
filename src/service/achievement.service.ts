import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import AchievementModel, { AchievementInput, AchievementDocument } from "../models/achievement.model";


export async function createAchievement(input: AchievementInput) {
  const result = await AchievementModel.create(input);
  return result;
}

export async function findAchievement(query: FilterQuery<AchievementDocument>, options: QueryOptions = { lean: true }) {
  const result = await AchievementModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateAchievement(query: FilterQuery<AchievementDocument>, update: UpdateQuery<AchievementDocument>, options: QueryOptions) {
  return AchievementModel.findOneAndUpdate(query, update, options);
}

export async function deleteAchievement(query: FilterQuery<AchievementDocument>) {
  return AchievementModel.deleteOne(query);
}

export async function findAllAchievement() {
  const result = await AchievementModel.find().sort({ createdAt: -1 }); 
  return result;
}



export async function findAchievementByTeam(query: FilterQuery<AchievementDocument>, options: QueryOptions = { lean: true }) {
  const results = await AchievementModel.find(query, {}, options).sort({ createdAt: -1 }); 
  return results;
}