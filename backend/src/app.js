import express from "express";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";

const app = express();


// allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.vercel.app",
];


// middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());


// routes
app.use("/api/posts", postRoutes);


// defult route
app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

export default app;