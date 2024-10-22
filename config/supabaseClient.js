import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const supabaseUrl = "https://ymhrxaltvtkpdehhuxkx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaHJ4YWx0dnRrcGRlaGh1eGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjAwMDUsImV4cCI6MjA0NTE5NjAwNX0.05O-DOK8lYFmgtNLblq76rkDh4pnGLgVpPr11nP4lGc";

export const supabase = createClient(supabaseUrl, supabaseKey);
