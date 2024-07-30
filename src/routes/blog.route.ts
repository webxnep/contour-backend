import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { requireAdmin } from "../middleware/requireAdmin";
import { createBlogHandler, updateBlogHandler, getBlogHandler, getAllBlogHandler, deleteBlogHandler, getAllBlogHandlerForCard } from "../controller/blog.controller";
import { createBlogSchema, getBlogSchema, deleteBlogSchema } from "../schema/blog.schema";

const router = express.Router();

// router.post("/", [validate(createBlogSchema)], createBlogHandler);
router.post("/", createBlogHandler);

// router.patch(
//   "/:blogId",
//   [
//     requireAdmin,
//     upload.fields([
//       { name: "banner", maxCount: 1 },
//       { name: "authorImage", maxCount: 1 },
//     ]),
//   ],
//   updateBlogHandler
// );

router.patch("/:blogId", updateBlogHandler);
router.get("/:blogId", getBlogHandler);
router.get("/", getAllBlogHandler);
router.get("/get-all-blogs/for-card", getAllBlogHandlerForCard);
router.delete("/:blogId", [validate(deleteBlogSchema)], deleteBlogHandler);

export default router;
