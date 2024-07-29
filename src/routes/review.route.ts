import express from "express";
import { validate } from "../middleware/validateResource";
import upload from "../middleware/multer";
import { createReviewHandler, updateReviewHandler, getReviewHandler, getAllReviewHandler, deleteReviewHandler, getReviewByExpeditionHandler, } from "../controller/review.controller";
import { createReviewSchema, getReviewSchema, deleteReviewSchema } from "../schema/review.schema";
const router = express.Router();

router.post("/", [validate(createReviewSchema)], createReviewHandler);
router.patch("/:ReviewId", updateReviewHandler);
router.get("/:ReviewId", [validate(getReviewSchema)], getReviewHandler);
router.get("/", getAllReviewHandler);
router.delete("/:ReviewId", [validate(deleteReviewSchema)], deleteReviewHandler);
router.get("/by-expiditionId/:expeditionId", getReviewByExpeditionHandler);
// router.get("/by-team/:ReviewId", [validate(getReviewSchema)], getAllReviewByTeamHandler);



export default router;
