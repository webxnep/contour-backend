import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createPrivateDepartureHandler, updatePrivateDepartureHandler, getPrivateDepartureHandler, getAllPrivateDepartureHandler, deletePrivateDepartureHandler, getPrivateDepartureByExpeditionHandler } from "../controller/privateDeparture.controller";
import { getPrivateDepartureSchema, deletePrivateDepartureSchema, createPrivateDepartureSchema } from "../schema/privateDeparture.schema";

const router = express.Router();

router.post(
  "/",
  // [
  //   requireAdmin,
   
  // ],
  createPrivateDepartureHandler
);

router.patch(
  "/:privateDepartureId",
  // [
  //    requireAdmin,
  // ],
  updatePrivateDepartureHandler
);

router.get("/:privateDepartureId", [validate(getPrivateDepartureSchema)], getPrivateDepartureHandler);
router.get("/", getAllPrivateDepartureHandler);
router.delete("/:privateDepartureId", [validate(deletePrivateDepartureSchema)], deletePrivateDepartureHandler);
router.get("/by-expiditionId/:expeditionId",  getPrivateDepartureByExpeditionHandler);


export default router;
