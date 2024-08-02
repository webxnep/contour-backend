import express from "express";
import { validate } from "../middleware/validateResource";
import { createBookingHandler, updateBookingHandler, getBookingHandler, getAllBookingHandler, deleteBookingHandler, cancelBookingHandler } from "../controller/booking.controller";
import { createBookingSchema, deleteBookingSchema, getBookingSchema } from "../schema/booking.schema";
import { requireAdmin } from "../middleware/requireAdmin";
const router = express.Router();

// router.post("/", [validate(createBookingSchema)], createBookingHandler);
router.post("/", createBookingHandler);
router.patch("/:bookingId", updateBookingHandler);
router.patch("/cancel/:bookingId", cancelBookingHandler);
router.get("/:bookingId", [validate(getBookingSchema)], getBookingHandler);
router.get("/", getAllBookingHandler);
router.delete("/:bookingId", [validate(deleteBookingSchema)], deleteBookingHandler);
export default router;
