import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createPrivateDepartureHandler, updatePrivateDepartureHandler, getPrivateDepartureHandler, getAllPrivateDepartureHandler, deletePrivateDepartureHandler } from "../controller/privateDeparture.controller";
import { getPrivateDepartureSchema, deletePrivateDepartureSchema, createPrivateDepartureSchema } from "../schema/privateDeparture.schema";

const router = express.Router();

router.post(
  "/",
  
  
  createPrivateDepartureHandler
);

router.patch(
  "/:privateDepartureId",
  [
    requireAdmin,
   
  ],
  updatePrivateDepartureHandler
);
router.get("/:privateDepartureId", [validate(getPrivateDepartureSchema)], getPrivateDepartureHandler);

router.get("/", getAllPrivateDepartureHandler);
router.delete("/:privateDepartureId", [validate(deletePrivateDepartureSchema), requireAdmin], deletePrivateDepartureHandler);


export default router;
