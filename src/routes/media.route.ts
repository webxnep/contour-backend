import express from "express";
import { validate } from "../middleware/validateResource";
import { createMediaHandler, getMediaHandler, deleteMediaHandler, getMediaByExpeditionHandler } from "../controller/media.controller";
import { createMediaSchema, getMediaSchema, deleteMediaSchema } from "../schema/media.schema";

const router = express.Router();

router.post("/", [validate(createMediaSchema)], createMediaHandler);
router.get("/:mediaId", [validate(getMediaSchema)], getMediaHandler);
router.get("/by-expiditionId/:mediaId", [validate(getMediaSchema)], getMediaByExpeditionHandler);
router.delete("/:mediaId", [validate(deleteMediaSchema)], deleteMediaHandler);

export default router;
