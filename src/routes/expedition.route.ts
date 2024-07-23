import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createExpeditionHandler, updateExpeditionHandler, getExpeditionHandler, getAllExpeditionHandler, deleteExpeditionHandler, getAllExpeditionByTypeHandler, getAllExpeditionByMeterHandler, getAllExpeditionBySeasonTypeHandler, getExpeditionByObjectIdHandler, getAllUpcomingExpeditionHandler, getAllUpcomingTrekkingHandler, getExpeditionFromCategoryHandler, getExpeditionFromCollectionHandler } from "../controller/expedition.controller";
import { getExpeditionSchema, deleteExpeditionSchema, createExpeditionSchema, getExpeditionFromCategorySchema, getExpeditionFromCollectionSchema } from "../schema/expedition.schema";

const router = express.Router();

router.post(
  "/",
  [
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "routeMap", maxCount: 1 },
    ]),
    // validate(createExpeditionSchema),
  ],
  createExpeditionHandler
);

router.patch(
  "/:expeditionId",
  [
    //requireAdmin,
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "routeMap", maxCount: 1 },
    ]),
  ],
  updateExpeditionHandler
);
router.get("/:expeditionId", [validate(getExpeditionSchema)], getExpeditionHandler);
router.get("/category/:categoryId", [validate(getExpeditionFromCategorySchema)], getExpeditionFromCategoryHandler);
router.get("/collection/:collectionId", [validate(getExpeditionFromCollectionSchema)], getExpeditionFromCollectionHandler);
router.get("/", getAllExpeditionHandler);
router.delete("/:expeditionId", [validate(deleteExpeditionSchema)], deleteExpeditionHandler);
router.get("/by-type/:expeditionId", getAllExpeditionByTypeHandler);
router.get("/by-meter/:meter", getAllExpeditionByMeterHandler);
router.get("/by-season-type/:season", getAllExpeditionBySeasonTypeHandler);
router.get("by-id/:expeditionId", [validate(getExpeditionSchema)], getExpeditionByObjectIdHandler);

router.get("/get-all/upcoming/expedition", getAllUpcomingExpeditionHandler);

router.get("/get-all/upcoming/trekking", getAllUpcomingTrekkingHandler);

export default router;
