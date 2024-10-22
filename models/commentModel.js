// models/commentModel.js
import { supabase } from "../config/supabaseClient.js";

// Function to add a comment to a post
export const addComment = async (postId, userId, content) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ post_id: postId, user_id: userId, content }]);

  return { data, error };
};

// Function to get comments by post ID
export const getCommentsByPostId = async (postId) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId);

  return { data, error };
};

// Function to delete a comment by ID
export const deleteComment = async (commentId) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  return { data, error };
};
