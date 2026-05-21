import express from "express";

import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  exportPostsToCSV,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", createPost);

router.get("/", getPosts);

router.get("/export/csv", exportPostsToCSV);

router.get("/:id", getSinglePost);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;