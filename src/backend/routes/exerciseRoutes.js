import express from "express";
import upload from "../middleware/upload.js";
import {
  generate,
  getExercisePhoto,
  getExerciseTable,
  addExercise,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/generate", generate);
router.post("/photos", getExercisePhoto);
router.post("/create-table", getExerciseTable);
router.post("/add", upload.single("image"), addExercise);

export default router;
