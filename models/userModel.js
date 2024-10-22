import { supabase } from "../config/supabaseClient.js";

export const createUser = async (name, username, email, hashedPassword) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, username, email, password: hashedPassword }]);

  return { data, error };
};

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);
  return { data, error };
};

export const addToBlacklist = async (token) => {
  const { data, error } = await supabase
    .from("blacklist")
    .insert([{ token: token }]);

  return { data, error };
};

export const isBlacklisted = async (token) => {
  const { data, error } = await supabase
    .from("blacklist")
    .select("*")
    .eq("token", token)
    .single();
  return { data, error };
};
