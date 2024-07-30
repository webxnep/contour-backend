import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createGroupDepartureHandler, updateGroupDepartureHandler, getGroupDepartureHandler, getAllGroupDepartureHandler, deleteGroupDepartureHandler, getGroupDepartureByExpeditionHandler } from "../controller/groupDeparture.controller";
import { getGroupDepartureSchema, deleteGroupDepartureSchema, createGroupDepartureSchema } from "../schema/groupDeparture.schema";

const router = express.Router();

router.post(
  "/",

  // [
  //   requireAdmin,
  // ],
  createGroupDepartureHandler
);

router.patch(
  
  "/:groupDepartureId",
  // [
  //   requireAdmin,
  // ],
  updateGroupDepartureHandler
);

router.get("/:groupDepartureId", [validate(getGroupDepartureSchema)], getGroupDepartureHandler);
router.get("/", getAllGroupDepartureHandler);
router.delete("/:groupDepartureId", [validate(deleteGroupDepartureSchema)], deleteGroupDepartureHandler);
router.get("/by-expiditionId/:expeditionId",  getGroupDepartureByExpeditionHandler);

export default router;
