import express from "express";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";

const app = express();


// middlewares
app.use(cors());

app.use(express.json());


// routes
app.use("/api/posts", postRoutes);


// default route
app.get("/", (req, res) => {
  res.send("Blog API is running...");
});

export default app;