import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateFaqInput, UpdateFaqInput } from "../schema/faq.schema";
import { createFaq, findFaq, findAndUpdateFaq, deleteFaq, findAllFaq, findFaqByExpedition } from "../service/faq.service";

var colors = require("colors");

export async function createFaqHandler(req: Request<{}, {}, CreateFaqInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const faq = await createFaq(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: faq,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateFaqHandler(req: Request<UpdateFaqInput["params"]>, res: Response, next: NextFunction) {
  try {
    const faqId = req.params.faqId;
    const faq = await findFaq({ faqId });
    if (!faq) {
      next(new AppError("faq detail does not exist", 404));
      return;
    }

    const updatedFaq = await findAndUpdateFaq({ faqId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedFaq,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getFaqHandler(req: Request<UpdateFaqInput["params"]>, res: Response, next: NextFunction) {
  try {
    const faqId = req.params.faqId;
    const faq = await findFaq({ faqId });

    if (!faq) {
      next(new AppError("faq does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: faq,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getFaqByExpeditionHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const expeditionId = req.params.expeditionId;
    const results = await findFaqByExpedition({ expedition: expeditionId });

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

export async function deleteFaqHandler(req: Request<UpdateFaqInput["params"]>, res: Response, next: NextFunction) {
  try {
    const faqId = req.params.faqId;
    const faq = await findFaq({ faqId });

    if (!faq) {
      next(new AppError("faq does not exist", 404));
    }

    await deleteFaq({ faqId });
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

export async function getAllFaqHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllFaq();
    return res.json({
      status: "success",
      msg: "Get all faq success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
