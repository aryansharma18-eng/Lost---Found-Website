import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./db.js";
import reportRoutes from "./routes/reportRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

// DATABASE

connectDB();

// MIDDLEWARE

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

app.use("/api", reportRoutes);

// Basic route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Lost and Found API",
  });
});

// ERROR HANDLER

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// START SERVER

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});