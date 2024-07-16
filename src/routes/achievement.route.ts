import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createAchievementHandler, updateAchievementHandler, getAchievementHandler, getAllAchievementHandler, deleteAchievementHandler, getAllAchievementByTeamHandler } from "../controller/achievement.controller";
import { createAchievementSchema, getAchievementSchema, deleteAchievementSchema } from "../schema/achievement.schema";
const router = express.Router();

router.post("/", [upload.single("image"), validate(createAchievementSchema)], createAchievementHandler);
router.patch("/:achievementId", [upload.single("image")], updateAchievementHandler);
router.get("/:achievementId", [validate(getAchievementSchema)], getAchievementHandler);
router.get("/", getAllAchievementHandler);
router.delete("/:achievementId", [validate(deleteAchievementSchema)], deleteAchievementHandler);
router.get("/by-team/:achievementId", [validate(getAchievementSchema)], getAllAchievementByTeamHandler);



export default router;
