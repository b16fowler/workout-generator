import express from "express";
import upload from "../middleware/upload.js";
import {
  generateWorkout,
  getExercisePhoto,
  getExerciseTable,
  addExercise,
  saveWorkout,
  workoutNames,
  loadPreview,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/generateWorkout", generateWorkout);
router.post("/photos", getExercisePhoto);
router.post("/create-table", getExerciseTable);
router.post("/add", upload.single("image"), addExercise);
router.post("/save-workout", saveWorkout);
router.post("/workout-names", workoutNames);
router.post("/load-preview", loadPreview);

export default router;
