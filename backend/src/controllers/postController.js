import Post from "../models/Post.js";
import { Parser } from "json2csv";

// CREATE POST
export const createPost = async (req, res) => {
  try {
    const {
      title,
      author,
      email,
      category,
      tags,
      status,
      thumbnail,
      shortDescription,
      content,
    } = req.body;

    const post = await Post.create({
      title,
      author,
      email,
      category,
      tags,
      status,
      thumbnail,
      shortDescription,
      content,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL POSTS (SEARCH + FILTER + PAGINATION)
export const getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const search = req.query.search || "";
    const category = req.query.category || "";
    const status = req.query.status || "";

    const query = {
      $and: [
        {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        },
        category && { category },
        status && { status },
      ].filter(Boolean),
    };

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE POST
export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// EXPORT CSV
export const exportPostsToCSV = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };

    const posts = await Post.find(query).select(
      "title author category content createdAt"
    );

    const fields = ["title", "author", "category", "content", "createdAt"];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(posts);

    res.header("Content-Type", "text/csv");
    res.attachment("posts.csv");

    return res.send(csv);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};