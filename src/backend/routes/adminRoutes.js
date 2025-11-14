import express from "express";
import {
  searchUser,
  resetPassword,
  deleteAccount,
  accountsTable,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/search", searchUser);
router.post("/reset", resetPassword);
router.post("/delete", deleteAccount);
router.get("/accounts-table", accountsTable);

export default router;
