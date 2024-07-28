import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createFaqHandler, updateFaqHandler, getFaqHandler, getAllFaqHandler, deleteFaqHandler, getFaqByExpeditionHandler } from "../controller/faq.controller";
import { createFaqSchema, getFaqSchema, deleteFaqSchema } from "../schema/faq.schema";

const router = express.Router();

router.post("/", [ validate(createFaqSchema)], createFaqHandler);
router.patch("/:faqId",  updateFaqHandler);
router.get("/:faqId", [validate(getFaqSchema)], getFaqHandler);
router.get("/by-expiditionId/:expeditionId",  getFaqByExpeditionHandler);
router.get("/", getAllFaqHandler);
router.delete("/:faqId", [ validate(deleteFaqSchema)], deleteFaqHandler);

export default router;
