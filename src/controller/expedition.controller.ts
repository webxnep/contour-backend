import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateExpeditionInput, findExpeditionFromCategoryInput, findExpeditionFromCollectionInput, ReadExpeditionInput, UpdateExpeditionInput } from "../schema/expedition.schema";
import { createExpedition, findExpedition, findAndUpdateExpedition, deleteExpedition, findAllExpedition, findAllExpeditionByType, findAllExpeditionByMeter, findAllUpcomingExpedition, findAllUpcomingTrekking, findManyExpedition } from "../service/expedition.service";
import ExpeditionModel from "../models/expedition";
var colors = require("colors");

export async function createExpeditionHandler(req: Request<{}, {}, CreateExpeditionInput["body"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
   
    let img1;
    if (files && files["banner"]) {
      const banner = files["banner"][0];
      img1 = await uploadSingleFile(banner);
    }
    let img2;
    if (files && files["routeMap"]) {
      const routeMap = files["routeMap"][0];
      img2= await uploadSingleFile(routeMap);
    }

   

    const body = req.body;
    console.log(body)
    const expedition = await createExpedition({ ...body});
    return res.json({
      status: "success",
      msg: "Create success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateExpeditionHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });
    if (!expedition) {
      next(new AppError("expedition detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = expedition.banner;
    if (files && files["banner"]) {
      const banner = files["banner"][0];
      img1 = await uploadSingleFile(banner);
    }

    let img2 = expedition.routeMap;
    if (files && files["routeMap"]) {
      const routeMap = files["routeMap"][0];
      img2 = await uploadSingleFile(routeMap);
    }

    const updatedExpedition = await findAndUpdateExpedition(
      { expeditionId },
      { ...req.body },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedExpedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getExpeditionHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getExpeditionByObjectIdHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const id = req.params.expeditionId;
    const expedition = await findExpedition({ expedition: id });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteExpeditionHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const expedition = await findExpedition({ expeditionId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    await deleteExpedition({ expeditionId });
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

export async function getAllExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllExpedition();
    return res.json({
      status: "success",
      msg: "Get all success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function getAllUpcomingExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllUpcomingExpedition();
    return res.json({
      status: "success",
      msg: "Get all success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllUpcomingTrekkingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllUpcomingTrekking();
    return res.json({
      status: "success",
      msg: "Get all success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpeditionByTypeHandler(req: Request<UpdateExpeditionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const type = req.params.expeditionId;
    const expeditions = await findAllExpeditionByType({ type });
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpeditionByMeterHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const meter = req.params.meter;
    const expeditions = await findAllExpeditionByMeter({ meter });
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllExpeditionBySeasonTypeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const season = req.params.season;
    const query: any = {};
    query[season] = "true";
    const expeditions = await ExpeditionModel.find(query);
    return res.json({
      status: "success",
      msg: "Get success",
      data: expeditions,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}


export async function getExpeditionFromCollectionHandler(req: Request<findExpeditionFromCollectionInput["params"]>, res: Response, next: NextFunction) {
  try {
    const collectionId = req.params.collectionId;
    const expedition = await findExpedition({ collections:{$eq:collectionId}});

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getExpeditionFromCategoryHandler(req: Request<findExpeditionFromCategoryInput["params"]>, res: Response, next: NextFunction) {
  try {
    const categoryId = req.params.categoryId;
    const expedition = await findManyExpedition({ category:{$eq:categoryId} });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function filterExpedition(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.body;
    const expedition = await findExpedition(filter);

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}