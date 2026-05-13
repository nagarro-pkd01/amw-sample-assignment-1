import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/posts";
import { initDB } from "./config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.get("/", (_, res) => {
  res.send("API Running");
});

const startServer = async () => {
  await initDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();