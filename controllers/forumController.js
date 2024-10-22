// controllers/contentController.js
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../models/postModel.js";
import {
  addComment,
  getCommentsByPostId,
  deleteComment,
} from "../models/commentModel.js";

import { supabase } from "../config/supabaseClient.js";
// Create a new post
export const createPostHandler = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // Ambil user id dari middleware auth
  let imageUrl = null; // Inisialisasi URL gambar

  // Jika ada file gambar yang diupload
  if (req.file) {
    const fileName = `${req.file.originalname}`;

    try {
      const { data, error } = await supabase.storage
        .from("dietica-bucket/Post-Image")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) {
        return res.status(500).json({ message: "Error uploading image" });
      }

      // Mendapatkan URL gambar
      imageUrl = `${supabase.supabaseUrl}/storage/v1/object/public/dietica-bucket/Post-Image/${fileName}`;
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Menyimpan postingan ke database
  try {
    const { data: post, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        user_id: userId,
        image: imageUrl, // Simpan URL gambar jika ada
      },
    ]);

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res
      .status(201)
      .json({ message: "Post created successfully", data: post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getAllPostsHandler = async (req, res) => {
  try {
    const { data, error } = await getAllPosts();
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get post by ID
export const getPostByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await getPostById(id);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a post
export const updatePostHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const { data, error } = await updatePost(id, title, content, image);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ message: "Post updated successfully", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a post
export const deletePostHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await deletePost(id);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ message: "Post deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Add a comment to a post
export const createCommentHandler = async (req, res) => {
  const { postId, content } = req.body;
  const userId = req.user.id; // Mengambil user id dari middleware otentikasi

  try {
    const { data, error } = await addComment(postId, userId, content);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(201)
      .json({ message: "Comment added successfully", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get comments by post ID
export const getCommentsHandler = async (req, res) => {
  const { postId } = req.params;

  try {
    const { data, error } = await getCommentsByPostId(postId);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a comment
export const deleteCommentHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await deleteComment(id);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(200)
      .json({ message: "Comment deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
