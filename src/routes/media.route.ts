import express from "express";
import { validate } from "../middleware/validateResource";
import { createMediaHandler, getMediaHandler, deleteMediaHandler, getMediaByExpeditionHandler, updateMediaHandler } from "../controller/media.controller";
import { createMediaSchema, getMediaSchema, deleteMediaSchema, updateMediaSchema } from "../schema/media.schema";

const router = express.Router();

router.post("/", [validate(createMediaSchema)], createMediaHandler);
router.patch("/:mediaId",  updateMediaHandler);
router.get("/:mediaId", [validate(getMediaSchema)], getMediaHandler);
router.get("/by-expiditionId/:mediaId", [validate(getMediaSchema)], getMediaByExpeditionHandler);
router.delete("/:mediaId", [validate(deleteMediaSchema)], deleteMediaHandler);

export default router;
