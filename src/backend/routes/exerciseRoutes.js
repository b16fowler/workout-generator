import express from "express";
import upload from "../middleware/upload.js";
import {
  generate,
  getExercisePhoto,
  getExerciseTable,
  addExercise,
  saveWorkout,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/generate", generate);
router.post("/photos", getExercisePhoto);
router.post("/create-table", getExerciseTable);
router.post("/add", upload.single("image"), addExercise);
router.post("/save-workout", saveWorkout);

export default router;
