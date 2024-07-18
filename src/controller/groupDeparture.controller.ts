import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateGroupDepartureInput,UpdateGroupDepartureInput } from "../schema/groupDeparture.schema";
import { createGroupDeparture, deleteGroupDeparture, findAllGroupDeparture, findAndUpdateGroupDeparture, findGroupDeparture } from "../service/groupDeparture.service";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
var colors = require("colors");

export async function createGroupDepartureHandler(req: Request<{}, {}, CreateGroupDepartureInput["body"]>, res: Response, next: NextFunction) {
  try {
   
 
    const body = req.body;
    const groupDeparture = await createGroupDeparture(body);

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: groupDeparture,
    });

  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateGroupDepartureHandler(req: Request<UpdateGroupDepartureInput["params"]>, res: Response, next: NextFunction) {
  try {
    
    const groupDepartureId = req.params.groupDepartureId;
    const groupDeparture = await findGroupDeparture({ groupDepartureId });

    if (!groupDeparture) {
      next(new AppError("Group Departure does not exist", 404));
      return;
    }

  

    const updatedGroupDeparture = await findAndUpdateGroupDeparture(
      { groupDepartureId },
      { ...req.body},
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedGroupDeparture,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getGroupDepartureHandler(req: Request<UpdateGroupDepartureInput["params"]>, res: Response, next: NextFunction) {
  try {
    const groupDepartureId = req.params.groupDepartureId;
    const groupDeparture = await findGroupDeparture({ groupDepartureId });

    if (!groupDeparture) {
      next(new AppError("Group Departure does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: groupDeparture,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteGroupDepartureHandler(req: Request<UpdateGroupDepartureInput["params"]>, res: Response, next: NextFunction) {
  try {
    const groupDepartureId = req.params.groupDepartureId;
    const groupDeparture = await findGroupDeparture({ groupDepartureId });

    if (!groupDeparture) {
      next(new AppError("Group Departure does not exist", 404));
    }

    await deleteGroupDeparture({ groupDepartureId });
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

export async function getAllGroupDepartureHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllGroupDeparture();
    return res.json({
      status: "success",
      msg: "Get all group departures success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
