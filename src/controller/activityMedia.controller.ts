import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateActivityMediaInput, UpdateActivityMediaInput } from "../schema/activityMedia";
import { createActivityMedia, findActivityMedia, findAndUpdateActivityMedia, deleteActivityMedia, findAllActivityMedia, findActivityMediaByTeam } from "../service/activityMedia.service";


var colors = require("colors");

export async function createActivityMediaHandler(req: Request<{}, {}, CreateActivityMediaInput["body"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;
    const url = await uploadSingleFile(image);

    const body = req.body;
    const item = await createActivityMedia({ ...body, image: url });

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

export async function updateActivityMediaHandler(req: Request<UpdateActivityMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;

    const activityMediaId = req.params.activityMediaId;
    const item = await findActivityMedia({ activityMediaId });

    if (!item) {
      next(new AppError("item does not exist", 404));
      return;
    }

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    const updatedItem = await findAndUpdateActivityMedia(
      { activityMediaId },
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

export async function getActivityMediaHandler(req: Request<UpdateActivityMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityMediaId = req.params.activityMediaId;
    const item = await findActivityMedia({ activityMediaId });

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

export async function deleteActivityMediaHandler(req: Request<UpdateActivityMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityMediaId = req.params.activityMediaId;
    const item = await findActivityMedia({ activityMediaId });

    if (!item) {
      next(new AppError("item does not exist", 404));
    }

    await deleteActivityMedia({ activityMediaId });
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

export async function getAllActivityMediaHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllActivityMedia();
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


export async function getAllActivityMediaByTeamHandler(req: Request<UpdateActivityMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.activityMediaId;
    const iternarnaries = await findActivityMediaByTeam({ activity: activityId });
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