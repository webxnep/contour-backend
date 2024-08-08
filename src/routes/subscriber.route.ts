import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createSubscriberSchema, deleteSubscriberSchema, getSubscriberSchema } from "../schema/subscriber.schema";
import { createSubscriberHandler, deleteSubscriberHandler, getAllSubscriberHandler, getSubscriberHandler, updateSubscriberHandler } from "../controller/subscriber.controller";
const router = express.Router();

router.post("/", [validate(createSubscriberSchema)], createSubscriberHandler);
router.patch("/:subscriberId", [validate(createSubscriberSchema)], updateSubscriberHandler);
router.get("/:subscriberId", [validate(getSubscriberSchema)], getSubscriberHandler);
router.get("/", getAllSubscriberHandler);
router.delete("/:subscriberId", [validate(deleteSubscriberSchema)], deleteSubscriberHandler);

export default router;
