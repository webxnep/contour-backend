import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateDiscountInput, UpdateDiscountInput } from "../schema/discount.schema";
import { createDiscount, findDiscount, findAndUpdateDiscount, deleteDiscount, findAllDiscount, findAllDiscountForCard } from "../service/discount.service";
var colors = require("colors");

export async function createDiscountHandler(req: Request<{}, {}, CreateDiscountInput["body"]>, res: Response, next: NextFunction) {
  try {
    
    const body = req.body;
    console.log(body);
  
    const discount = await createDiscount(body);
    return res.json({
      status: "success",
      msg: "Create success",
      data: discount,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateDiscountHandler(req: Request<UpdateDiscountInput["params"]>, res: Response, next: NextFunction) {
  try {
    const discountId = req.params.discountId;
    const discount = await findDiscount({ discountId });

    if (!discount) {
      next(new AppError("Blog does not exist", 404));
      return; 
    }

    const updatedDiscount = await findAndUpdateDiscount({ discountId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedDiscount,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getDiscountHandler(req: Request<UpdateDiscountInput["params"]>, res: Response, next: NextFunction) {
  try {
    const discountId = req.params.discountId;
    console.log(discountId);
    const discount = await findDiscount({ discountId });

    if (!discount) {
      next(new AppError("discount does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: discount,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteDiscountHandler(req: Request<UpdateDiscountInput["params"]>, res: Response, next: NextFunction) {
  try {
    const discountId = req.params.discountId;
    const discount = await findDiscount({ discountId });

    if (!discount) {
      next(new AppError("discount does not exist", 404));
    }

    await deleteDiscount({ discountId });
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

export async function getAllDiscountHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query;
    const results = await findAllDiscount(filter);
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


