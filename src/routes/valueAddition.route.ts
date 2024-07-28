import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createValueAdditionHandler, updateValueAdditionHandler, getValueAdditionHandler, getAllValueAdditionHandler, deleteValueAdditionHandler, getValueAdditionByExpeditionHandler } from "../controller/valueAddition.controller";
import { createValueAdditionSchema, getValueAdditionSchema, deleteValueAdditionSchema } from "../schema/valueAddition.schema";

const router = express.Router();

router.post("/", [ validate(createValueAdditionSchema)], createValueAdditionHandler);
router.patch("/:valueAdditionId",  updateValueAdditionHandler);
router.get("/:valueAdditionId", [validate(getValueAdditionSchema)], getValueAdditionHandler);
router.get("/by-expiditionId/:valueAdditionId", getValueAdditionByExpeditionHandler);
router.get("/", getAllValueAdditionHandler);
router.delete("/:valueAdditionId", [ validate(deleteValueAdditionSchema)], deleteValueAdditionHandler);

export default router;
