/**************************************************************************
 * server.js
 **************************************************************************/

import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

// Set up server
const app = express();
const PORT = process.env.BACKEND_PORT;

app.use(express.json());
app.use(cors());
app.set("trust proxy", true);

app.get("/", (req, res) => {
  res.send(`Server is running\nget request from IP ${req.ip}`);
});

// Register routing groups
app.use("/api", authRoutes);
app.use("/api", exerciseRoutes);
app.use("/api", adminRoutes);
app.use("/api", analyticsRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\nBackend is listening on port ${PORT}\n`);
});
