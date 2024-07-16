import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateBlogInput, UpdateBlogInput } from "../schema/blog.schema";
import { createBlog, findBlog, findAndUpdateBlog, deleteBlog, findAllBlog } from "../service/blog.service";
var colors = require("colors");

export async function createBlogHandler(req: Request<{}, {}, CreateBlogInput["body"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    const banner = files["banner"][0];
    const authorImage = files["authorImage"][0];

    const front = await uploadSingleFile(banner);
    const back = await uploadSingleFile(authorImage);

    const body = req.body;
    const expedition = await createBlog({ ...body, banner: front, authorImage: back });
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

export async function updateBlogHandler(req: Request<UpdateBlogInput["params"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const blogId = req.params.blogId;
    const expedition = await findBlog({ blogId });
    if (!expedition) {
      next(new AppError("expedition detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = expedition.banner;
    if (files && files["banner"]) {
      const banner = files["banner"][0];
      img1 = await uploadSingleFile(banner);
    }

    let img2 = expedition.authorImage;
    if (files && files["authorImage"]) {
      const authorImage = files["authorImage"][0];
      img2 = await uploadSingleFile(authorImage);
    }

    const updatedBlog = await findAndUpdateBlog(
      { blogId },
      { ...req.body, banner: img1, authorImage: img2 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getBlogHandler(req: Request<UpdateBlogInput["params"]>, res: Response, next: NextFunction) {
  try {
    const blogId = req.params.blogId;
    const expedition = await findBlog({ blogId });

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

export async function deleteBlogHandler(req: Request<UpdateBlogInput["params"]>, res: Response, next: NextFunction) {
  try {
    const blogId = req.params.blogId;
    const expedition = await findBlog({ blogId });

    if (!expedition) {
      next(new AppError("expedition does not exist", 404));
    }

    await deleteBlog({ blogId });
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

export async function getAllBlogHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllBlog();
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
