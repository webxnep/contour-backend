import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateActivityInput, UpdateActivityInput } from "../schema/activity";
import { createActivity, findActivity, findAndUpdateActivity, deleteActivity, findAllActivity } from "../service/activity.service";
var colors = require("colors");

export async function createActivityHandler(req: Request<{}, {}, CreateActivityInput["body"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;
    console.log(image);

    const url = await uploadSingleFile(image);
    console.log(url);
    const body = req.body;
    const activity = await createActivity({ ...body, image: url });

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: activity,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateActivityHandler(req: Request<UpdateActivityInput["params"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;
    console.log(image);

    const activityId = req.params.activityId;
    const activity = await findActivity({ activityId });

    if (!activity) {
      next(new AppError("Activity does not exist", 404));
      return;
    }

    let img1;
    if (image) {
      img1 = await uploadSingleFile(image);
    }

    const updatedActivity = await findAndUpdateActivity(
      { activityId },
      { ...req.body, image: img1 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedActivity,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getActivityHandler(req: Request<UpdateActivityInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.activityId;
    const activity = await findActivity({ activityId });

    if (!activity) {
      next(new AppError("activity does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: activity,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteActivityHandler(req: Request<UpdateActivityInput["params"]>, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.activityId;
    const activity = await findActivity({ activityId });

    if (!activity) {
      next(new AppError("activity does not exist", 404));
    }

    await deleteActivity({ activityId });
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

export async function getAllActivityHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllActivity();
    return res.json({
      status: "success",
      msg: "Get all activity success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
