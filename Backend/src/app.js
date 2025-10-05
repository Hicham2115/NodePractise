import express from "express";
import notesRouter from "./Routes/notesRouter.js";
import { connectDB } from "../config/Db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();

//middleware

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());
const limiter = rateLimit({
  windowMs: 20 * 1000, // 20 seconds
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api/notes", limiter);

app.use("/api/notes", notesRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
  });
}


connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server Running On Port : 3000");
  });
});
