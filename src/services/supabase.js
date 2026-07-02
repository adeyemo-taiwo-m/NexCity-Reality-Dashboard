import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xwhciigjumwemozkgpvn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3aGNpaWdqdW13ZW1vemtncHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5OTcxNTQsImV4cCI6MjA5ODU3MzE1NH0.MhRGuL089xyuWkeEF-2qlhjKH3k_p9k98ecP52o535I";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
