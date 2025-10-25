import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://yhfbgejhcmxejprjjisp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloZmJnZWpoY214ZWpwcmpqaXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNDE3NDksImV4cCI6MjA3NjkxNzc0OX0.pFuk684L_hwRkUc_bW5x5_MkKuW6U0Kg6eFUum0FQQE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
