import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCategoryHandler, updateCategoryHandler, getCategoryHandler, getAllCategoryHandler, deleteCategoryHandler, getCategoryFromCollectionHandler } from "../controller/category.controller";
import { createCategorySchema, getCategorySchema, deleteCategorySchema, getCategoryFromCollectionSchema } from "../schema/category.schema";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/", [ upload.single("image")], createCategoryHandler);
router.patch("/:categoryId", [ upload.single("image")], updateCategoryHandler);
router.get("/:categoryId", [ validate(getCategorySchema)], getCategoryHandler);
router.get("/collection/:collectionId", [ validate(getCategoryFromCollectionSchema)], getCategoryFromCollectionHandler);
router.get("/",  getAllCategoryHandler);
router.delete("/:categoryId", [ validate(deleteCategorySchema)], deleteCategoryHandler);

export default router;
