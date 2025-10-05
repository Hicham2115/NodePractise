import express from "express";
import notesRouter from "./src/Routes/notesRouter.js";
import { connectDB } from "./config/Db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

connectDB();

//middleware
app.use(cors());
app.use(express.json());

// Limit each IP to 10 requests per 20 seconds
const limiter = rateLimit({
  windowMs: 10 * 1000, // 20 seconds
  max: 5, // limit each IP to 10 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
});

app.use("/api/notes", limiter); // apply to all API routes
// app.use(rateLimiter);

app.use("/api/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server Running On Port : 3000");
});
