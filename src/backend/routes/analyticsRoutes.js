import express from "express";
import {
  accountCreated,
  accountLogin,
  workoutFinished,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/analytics/account-created", accountCreated);
router.post("/analytics/login", accountLogin);
router.post("/workout-finished", workoutFinished);

export default router;
