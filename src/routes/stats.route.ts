import express from "express";
import { getAllStats } from "../controller/stats.controller";
const router = express.Router();

router.get("/", getAllStats);

export default router;
