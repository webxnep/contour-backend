import express from "express";
import { validate } from "../middleware/validateResource";

import { createCustomTripHandler, deleteCustomTripHandler, getAllCustomTripHandler, getCustomTripHandler, updateCustomTripHandler } from "../controller/customTrip.controller";
import { deleteCustomTripSchema, getCustomTripSchema } from "../schema/customTrip.schema";

const router = express.Router();

router.post("/", createCustomTripHandler);
router.patch("/:customTripId", updateCustomTripHandler);
router.get("/:customTripId", [validate(getCustomTripSchema)], getCustomTripHandler);
router.get("/", getAllCustomTripHandler);
router.delete("/:customTripId", [validate(deleteCustomTripSchema)], deleteCustomTripHandler);

export default router;
