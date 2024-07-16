import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { createInbox, findInbox, findAndUpdateInbox, deleteInbox, findAllInbox } from "../service/inbox.service";
import { CreateInboxInput, UpdateInboxInput } from "../schema/inbox.schema";
import nodemailer from "nodemailer";
var colors = require("colors");

export async function createInboxHandler(req: Request<{}, {}, CreateInboxInput["body"]>, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const inbox = await createInbox(body);

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "info@epeakexpedition.com",
    //     pass: "kwst akds mqfb exvt",
    //   },
    // });

    // const info = await transporter.sendMail({
    //   from: "epeak",
    //   // to: req.body.email,
    //   to: "lokichaulagain@gmail.com",
    //   subject: "Inquiry Mail ✔",
    //   html: `<div>
    // <div class="container">
    //  <div class="content">
    //      <p class="heading">Ful Name = ${body.fullName}</p>
    //      <p class="heading">Email = ${body.email}</p>
    //      <p class="heading">Address = ${body.address}</p>
    //      <p class="heading">Message = ${body.message}</p>
    //  </div>
    // </div>`,
    // });

    return res.json({
      status: "success",
      msg: "Message sent success",
      data: inbox,
      // mailInfo: info,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateInboxHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("inbox does not exist", 404));
      return;
    }

    const updatedCostInbox = await findAndUpdateInbox({ inboxId }, req.body, {
      new: true,
    });

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostInbox,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getInboxHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("inbox does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: inbox,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteInboxHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("inbox does not exist", 404));
    }

    await deleteInbox({ inboxId });
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

export async function getAllInboxHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const results = await findAllInbox();
    return res.json({
      status: "success",
      msg: "Get all inbox success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function inboxSeenHandler(req: Request<UpdateInboxInput["params"]>, res: Response, next: NextFunction) {
  try {
    const inboxId = req.params.inboxId;
    const inbox = await findInbox({ inboxId });

    if (!inbox) {
      next(new AppError("Inbox does not exist", 404));
      return;
    }

    const updatedInbox = await findAndUpdateInbox(
      { inboxId },
      { ...req.body, isSeen: true },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedInbox,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
