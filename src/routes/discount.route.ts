import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createDiscountHandler, updateDiscountHandler, getDiscountHandler, getAllDiscountHandler, deleteDiscountHandler} from "../controller/discount.controller";
import { createDiscountSchema, getDiscountSchema, deleteDiscountSchema } from "../schema/discount.schema";

const router = express.Router();

// router.post("/", [validate(createBlogSchema)], createBlogHandler);
router.post("/", createDiscountHandler);


router.patch("/:discountId", updateDiscountHandler);
router.get("/:discountId", getDiscountHandler);
router.get("/", getAllDiscountHandler);

router.delete("/:discountId", [validate(deleteDiscountSchema)], deleteDiscountHandler);

export default router;
