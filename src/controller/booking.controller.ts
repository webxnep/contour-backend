import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { CreateBookingInput, UpdateBookingInput } from "../schema/booking.schema";
import { createBooking, deleteBooking, findAllBooking, findAndUpdateBooking, findBooking } from "../service/booking.service";
import { createUser, findUser } from "../service/user.service";
import { generateHashedPassword } from "../utils/generateHashedPassword";
import crypto from "crypto";

var colors = require("colors");

// export async function createBookingHandler(req: Request<{}, {}, CreateBookingInput["body"]>, res: Response, next: NextFunction) {
export async function createBookingHandler(req: Request<{}, {}, any>, res: Response, next: NextFunction) {
  try {
    // Before creating booking register the user
    const userExistWithEmail = await findUser({ email: req.body.email });
    if (userExistWithEmail) {
      return next(new AppError("User with this email already exists", 409));
    }

    const hashedPassword = await generateHashedPassword(req.body.password);
    const token = crypto.randomBytes(20).toString("hex");
    const registeredUser = await createUser({ ...req.body, password: hashedPassword, verifyToken: token, isVerified: false });
    console.log("registeredUser", registeredUser);
    const body = req.body;
    const booking = await createBooking({...body,paymentStatus: "pending", paymentMethod: "card", user: registeredUser?._id });
    console.log(booking)
    return res.status(201).json({
      status: "success",
      msg: "Booking success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function updateBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateBooking(
      { bookingId },
      { ...req.body, isSeen: true },
      {
        new: true,
      }
    );

    return res.status(201).json({
      status: "success",
      msg: "Update success",
      data: updatedCostBooking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    return res.json({
      status: "success",
      msg: "Get success",
      data: booking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function deleteBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
    }

    await deleteBooking({ bookingId });
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

export async function cancelBookingHandler(req: Request<UpdateBookingInput["params"]>, res: Response, next: NextFunction) {
  try {
    const bookingId = req.params.bookingId;
    const booking = await findBooking({ bookingId });

    if (!booking) {
      next(new AppError("booking does not exist", 404));
      return;
    }

    const updatedCostBooking = await findAndUpdateBooking(
      { bookingId },
      { ...req.body, status: "canceled" },
      {
        new: true,
      }
    );

    return res.json({
      status: "success",
      msg: "Update success",
      data: updatedCostBooking,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}

export async function getAllBookingHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const filter = req.query; 
  


    const results = await findAllBooking(filter);
    return res.json({
      status: "success",
      msg: "Get all booking success",
      data: results,
    });
  } catch (error: any) {
    console.error(colors.red("msg:", error.message));
    next(new AppError("Internal server error", 500));
  }
}
