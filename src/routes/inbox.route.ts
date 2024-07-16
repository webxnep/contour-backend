import express from "express";
import { validate } from "../middleware/validateResource";
import { createInboxHandler, updateInboxHandler, getInboxHandler, getAllInboxHandler, deleteInboxHandler, inboxSeenHandler } from "../controller/inbox.controller";
import { createInboxSchema, getInboxSchema, deleteInboxSchema } from "../schema/inbox.schema";
const router = express.Router();

router.post("/", [validate(createInboxSchema)], createInboxHandler);
router.patch("/:inboxId", updateInboxHandler);
router.get("/:inboxId", [validate(getInboxSchema)], getInboxHandler);
router.get("/", getAllInboxHandler);
router.delete("/:inboxId", [validate(deleteInboxSchema)], deleteInboxHandler);

router.patch("/seen/:inboxId", inboxSeenHandler);
export default router;
