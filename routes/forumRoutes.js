// routes/contentRoutes.js
import express from "express";
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostHandler,
  createCommentHandler,
  getCommentsHandler,
  deleteCommentHandler,
} from "../controllers/forumController.js";
import { authenticate } from "../middleware/authentication.js";

const router = express.Router();

// Routes for posts
router.post("/posts", authenticate, createPostHandler); // Create a post
router.get("/posts", getAllPostsHandler); // Get all posts
router.get("/posts/:id", getPostByIdHandler); // Get post by ID
router.put("/posts/:id", authenticate, updatePostHandler); // Update a post
router.delete("/posts/:id", authenticate, deletePostHandler); // Delete a post

// Routes for comments
router.post("/comments", authenticate, createCommentHandler); // Add a comment
router.get("/comments/:postId", getCommentsHandler); // Get comments by post ID
router.delete("/comments/:id", authenticate, deleteCommentHandler); // Delete a comment

export default router;
