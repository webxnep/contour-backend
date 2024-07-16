import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateMediaInput, UpdateMediaInput } from "../schema/media.schema";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { createMedia, findMedia, findMediaByExpedition, deleteMedia } from "../service/media.service";

var colors = require("colors");

export async function createMediaHandler(req: Request<{}, {}, CreateMediaInput["body"]>, res: Response, next: NextFunction) {
  try {
    const image = req.file;

    const url = await uploadSingleFile(image);
    console.log(url);
    const body = req.body;
    const category = await createMedia({ ...body, media: url });

    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: category,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getMediaHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const mediaId = req.params.mediaId;
    const costExclude = await findMedia({ mediaId });

    if (!costExclude) {
      next(new AppError("costExclude does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: costExclude,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getMediaByExpeditionHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.mediaId;
    const results = await findMediaByExpedition({ expedition: expeditionId });

    return res.json({
      status: "success",
      msg: "Get success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteMediaHandler(req: Request<UpdateMediaInput["params"]>, res: Response, next: NextFunction) {
  try {
    const mediaId = req.params.mediaId;
    const costExclude = await findMedia({ mediaId });

    if (!costExclude) {
      next(new AppError("costExclude does not exist", 404));
    }

    await deleteMedia({ mediaId });
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
