import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createActivityMediaHandler, updateActivityMediaHandler, getActivityMediaHandler, getAllActivityMediaHandler, deleteActivityMediaHandler, getAllActivityMediaByTeamHandler } from "../controller/activityMedia.controller";
import { createActivityMediaSchema, getActivityMediaSchema, deleteActivityMediaSchema } from "../schema/activityMedia";
const router = express.Router();

router.post("/", [upload.single("image"), validate(createActivityMediaSchema)], createActivityMediaHandler);
router.patch("/:activityMediaId", [upload.single("image")], updateActivityMediaHandler);
router.get("/:activityMediaId", [validate(getActivityMediaSchema)], getActivityMediaHandler);
router.get("/", getAllActivityMediaHandler);
router.delete("/:activityMediaId", [validate(deleteActivityMediaSchema)], deleteActivityMediaHandler);
router.get("/by-activity/:activityMediaId", [validate(getActivityMediaSchema)], getAllActivityMediaByTeamHandler);

export default router;
