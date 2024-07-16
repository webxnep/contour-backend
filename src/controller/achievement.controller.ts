import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { createAchievement, deleteAchievement, findAchievement, findAchievementByTeam, findAllAchievement, findAndUpdateAchievement } from "../service/achievement.service";
import { CreateAchievementInput, UpdateAchievementInput } from "../schema/achievement.schema";

var colors = require("colors");

export async function createAchievementHandler(req: Request<{}, {}, CreateAchievementInput["body"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;
    const url = await uploadSingleFile(image);

    const body = req.body;
    const item = await createAchievement({ ...body, image: url });

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateAchievementHandler(req: Request<UpdateAchievementInput["params"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;

    const achievementId = req.params.achievementId;
    const item = await findAchievement({ achievementId });

    if (!item) {
      next(new AppError("item does not exist", 404));
      return;
    }

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    const updatedItem = await findAndUpdateAchievement(
      { achievementId },
      { ...req.body, image: img1 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedItem,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getAchievementHandler(req: Request<UpdateAchievementInput["params"]>, res: Response, next: NextFunction) {
  try {
    const achievementId = req.params.achievementId;
    const item = await findAchievement({ achievementId });

    if (!item) {
      next(new AppError("item does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: item,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteAchievementHandler(req: Request<UpdateAchievementInput["params"]>, res: Response, next: NextFunction) {
  try {
    const achievementId = req.params.achievementId;
    const item = await findAchievement({ achievementId });

    if (!item) {
      next(new AppError("item does not exist", 404));
    }

    await deleteAchievement({ achievementId });
    return res.json({
      status: "success",
      msg: "Delete success",
      data: {},
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllAchievementHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllAchievement();
    return res.json({
      status: "success",
      msg: "Get all item success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function getAllAchievementByTeamHandler(req: Request<UpdateAchievementInput["params"]>, res: Response, next: NextFunction) {
  try {
    const teamId = req.params.achievementId;
    const iternarnaries = await findAchievementByTeam({ team: teamId });
    console.log(iternarnaries);

    return res.json({
      status: "success",
      msg: "Get success",
      data: iternarnaries,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}