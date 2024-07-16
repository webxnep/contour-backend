import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import InquiryModel from "../models/inquery.model";
import AchievementModel from "../models/achievement.model";
import ActivityModel from "../models/activity.model";
import BlogModel from "../models/blog.model";
import BookingModel from "../models/booking.model";
import CategoryModel from "../models/category.model";
import ExpeditionModel from "../models/expedition";
import InboxModel from "../models/inbox.model";
import TeamModel from "../models/team.model";

var colors = require("colors");

export async function getAllStats(req: Request, res: Response, next: NextFunction) {
  try {
    const achievementCount = await AchievementModel.countDocuments();
    const activityCount = await ActivityModel.countDocuments();
    const blogCount = await BlogModel.countDocuments();
    const bookingCount = await BookingModel.countDocuments();
    const categoryCount = await CategoryModel.countDocuments();
    const expeditionCount = await ExpeditionModel.countDocuments({ type: "expedition" });
    const treekingCount = await ExpeditionModel.countDocuments({ treeking: "trekking" });
    const inboxCount = await InboxModel.countDocuments();
    const teamCount = await TeamModel.countDocuments();

    return res.json({
      status: "success",
      msg: "Get stats success",
      data: {
        achievementCount,
        activityCount,
        blogCount,
        bookingCount,
        categoryCount,
        expeditionCount,
        treekingCount,
        inboxCount,
        teamCount,
      },
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
