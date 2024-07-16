import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createBlogHandler, updateBlogHandler, getBlogHandler, getAllBlogHandler, deleteBlogHandler } from "../controller/blog.controller";
import { createBlogSchema, getBlogSchema, deleteBlogSchema } from "../schema/blog.schema";

const router = express.Router();

router.post(
  "/",
  [
    requireAdmin,
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "authorImage", maxCount: 1 },
    ]),
    validate(createBlogSchema),
  ],
  createBlogHandler
);

router.patch(
  "/:blogId",
  [
    requireAdmin,
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "authorImage", maxCount: 1 },
    ]),
  ],
  updateBlogHandler
);
router.get("/:blogId", [validate(getBlogSchema)], getBlogHandler);
router.get("/", getAllBlogHandler);
router.delete("/:blogId", [validate(deleteBlogSchema)], deleteBlogHandler);

export default router;
