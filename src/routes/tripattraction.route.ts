import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createTripAttractionHandler, updateTripAttractionHandler, getTripAttractionHandler, getAllTripAttractionHandler, deleteTripAttractionHandler, getTripAttractionByExpeditionHandler } from "../controller/tripattraction.controller";
import { createTripAttractionSchema, getTripAttractionSchema, deleteTripAttractionSchema } from "../schema/tripattraction.schema";

const router = express.Router();

router.post("/", [ validate(createTripAttractionSchema)], createTripAttractionHandler);
router.patch("/:tripAttractionId",  updateTripAttractionHandler);
router.get("/:tripAttractionId", [validate(getTripAttractionSchema)], getTripAttractionHandler);
router.get("/by-expiditionId/:expeditionId", getTripAttractionByExpeditionHandler);
router.get("/", getAllTripAttractionHandler);
router.delete("/:tripAttractionId", [ validate(deleteTripAttractionSchema)], deleteTripAttractionHandler);

export default router;
