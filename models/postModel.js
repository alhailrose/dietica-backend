// models/postModel.js
import { supabase } from "../config/supabaseClient.js";

// Function to create a new post
export const createPost = async (title, content, image, userId) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ title, content, image, user_id: userId }]);

  return { data, error };
};

// Function to get all posts
export const getAllPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");

  return { data, error };
};

// Function to get post by ID
export const getPostById = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

// Function to update a post
export const updatePost = async (id, title, content, image) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, image })
    .eq("id", id);

  return { data, error };
};

// Function to delete a post
export const deletePost = async (id) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  return { data, error };
};
