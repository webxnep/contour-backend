import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createFactHandler, updateFactHandler, getFactHandler, getAllFactHandler, deleteFactHandler, getFactByExpeditionHandler } from "../controller/fact.controller";
import { createFactSchema, getFactSchema, deleteFactSchema } from "../schema/fact.schema";

const router = express.Router();

router.post("/", [ validate(createFactSchema)], createFactHandler);
router.patch("/:factId",  updateFactHandler);
router.get("/:factId", [validate(getFactSchema)], getFactHandler);
router.get("/by-expiditionId/:factId", [validate(getFactSchema)], getFactByExpeditionHandler);
router.get("/", getAllFactHandler);
router.delete("/:factId", [ validate(deleteFactSchema)], deleteFactHandler);

export default router;
