import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { validate } from "../middleware/validateResource";
import { createCollectionHandler, updateCollectionHandler, getCollectionHandler, getAllCollectionHandler, deleteCollectionHandler } from "../controller/collection.controller";
import { createCollectionSchema, getCollectionSchema, deleteCollectionSchema } from "../schema/collection.schema";
import upload from "../middleware/multer";

const router = express.Router();

router.post("/", [ upload.single("image"), validate(createCollectionSchema)], createCollectionHandler);
router.patch("/:collectionId", [ upload.single("image")], updateCollectionHandler);
router.get("/:collectionId", [ validate(getCollectionSchema)], getCollectionHandler);
router.get("/",  getAllCollectionHandler);
router.delete("/:collectionId", [ validate(deleteCollectionSchema),requireAdmin], deleteCollectionHandler);

export default router;
