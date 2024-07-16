import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TeamModel, { TeamDocument, TeamInput } from "../models/team.model";

export async function createTeam(input: TeamInput) {
  const result = await TeamModel.create(input);
  return result;
}

export async function findTeam(query: FilterQuery<TeamDocument>, options: QueryOptions = { lean: true }) {
  const result = await TeamModel.findOne(query, {}, options);
  return result;
}

export async function findAndUpdateTeam(query: FilterQuery<TeamDocument>, update: UpdateQuery<TeamDocument>, options: QueryOptions) {
  return TeamModel.findOneAndUpdate(query, update, options);
}

export async function deleteTeam(query: FilterQuery<TeamDocument>) {
  return TeamModel.deleteOne(query);
}

// export async function findAllTeam() {
//   const results = await TeamModel.find().sort({ order: 1 });
//   return results;
// }

export async function findAllTeam() {
  const results = await TeamModel.aggregate([
    {
      $addFields: {
        orderInt: { $toInt: "$order" },
      },
    },
    {
      $sort: { orderInt: 1 },
    },
  ]);
  return results;
}
