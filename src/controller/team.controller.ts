import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { uploadSingleFile } from "../middleware/uploadSingleFile";
import { CreateTeamInput, UpdateTeamInput } from "../schema/team.schema";
import { createTeam, findTeam, findAndUpdateTeam, deleteTeam, findAllTeam } from "../service/team.service";
var colors = require("colors");

export async function createTeamHandler(req: Request<{}, {}, CreateTeamInput["body"]>, res: Response, next: NextFunction) {
  try {
    const { files } = req as { files: { [fieldname: string]: Express.Multer.File[] } };
    const image = files["image"][0];
    const bioData = files["bioData"][0];

    const img1 = await uploadSingleFile(image);
    const img2 = await uploadSingleFile(bioData);

    const body = req.body;
    const expedition = await createTeam({ ...body, image: img1, bioData: img2 });
    return res.status(201).json({
      status: "success",
      msg: "Create success",
      data: expedition,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateTeamHandler(req: Request<UpdateTeamInput["params"]>, res: Response, next: NextFunction) {
  try {
    // const image = req.file;

    // const teamId = req.params.teamId;
    // const team = await findTeam({ teamId });

    // if (!team) {
    //   next(new AppError("team does not exist", 404));
    //   return;
    // }

    // let img1;
    // if (image) {
    //   img1 = await uploadSingleFile(image);
    // }

    // const updatedTeam = await findAndUpdateTeam(
    //   { teamId },
    //   { ...req.body, image: img1 },
    //   {
    //     new: true,
    //   }
    // );

    // return res.json({
    //   status: "success",
    //   msg: "Update success",
    //   data: updatedTeam,
    // });

    const { files } = req as { files?: { [fieldname: string]: Express.Multer.File[] } }; // '?' to make files optional

    const teamId = req.params.teamId;
    const team = await findTeam({ teamId });
    if (!team) {
      next(new AppError("team detail does not exist", 404));
      return; // Return early to avoid further execution
    }

    let img1 = team.image;
    if (files && files["image"]) {
      const image = files["image"][0];
      img1 = await uploadSingleFile(image);
    }

    let img2 = team.bioData;
    if (files && files["bioData"]) {
      const bioData = files["bioData"][0];
      img2 = await uploadSingleFile(bioData);
    }

    const updatedTeam = await findAndUpdateTeam(
      { teamId },
      { ...req.body, image: img1, bioData: img2 },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedTeam,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    next(new AppError("Internal server error", 500));
  }
}

export async function getTeamHandler(req: Request<UpdateTeamInput["params"]>, res: Response, next: NextFunction) {
  try {
    const teamId = req.params.teamId;
    const team = await findTeam({ teamId });

    if (!team) {
      next(new AppError("team does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: team,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteTeamHandler(req: Request<UpdateTeamInput["params"]>, res: Response, next: NextFunction) {
  try {
    const teamId = req.params.teamId;
    const team = await findTeam({ teamId });

    if (!team) {
      next(new AppError("team does not exist", 404));
    }

    await deleteTeam({ teamId });
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

export async function getAllTeamHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllTeam()
    return res.json({
      status: "success",
      msg: "Get all team success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
