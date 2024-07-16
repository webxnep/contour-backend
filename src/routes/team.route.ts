import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createTeamHandler, updateTeamHandler, getTeamHandler, getAllTeamHandler, deleteTeamHandler } from "../controller/team.controller";
import { createTeamSchema, getTeamSchema, deleteTeamSchema } from "../schema/team.schema";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "bioData", maxCount: 1 },
    ]),

    validate(createTeamSchema),
  ],
  createTeamHandler
);
router.patch(
  "/:teamId",
  [
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "bioData", maxCount: 1 },
    ]),
  ],
  updateTeamHandler
);
router.get("/:teamId", [validate(getTeamSchema)], getTeamHandler);
router.get("/", getAllTeamHandler);
router.delete("/:teamId", [validate(deleteTeamSchema)], deleteTeamHandler);

export default router;
