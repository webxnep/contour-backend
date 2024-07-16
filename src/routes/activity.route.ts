import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createActivityHandler, updateActivityHandler, getActivityHandler, getAllActivityHandler, deleteActivityHandler } from "../controller/activity.controller";
import { createActivitySchema, getActivitySchema, deleteActivitySchema } from "../schema/activity";

const router = express.Router();

router.post("/", [upload.single("image"), validate(createActivitySchema)], createActivityHandler);
router.patch("/:activityId", [upload.single("image")], updateActivityHandler);
router.get("/:activityId", [validate(getActivitySchema)], getActivityHandler);
router.get("/", getAllActivityHandler);
router.delete("/:activityId", [validate(deleteActivitySchema)], deleteActivityHandler);

export default router;
