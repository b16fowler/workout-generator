import express from "express";
import {
  login,
  createAccount,
  checkAccountType,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", login);
router.post("/create-account", createAccount);
router.post("/check-account-type", checkAccountType);

export default router;
