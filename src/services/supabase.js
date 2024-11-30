import { createClient } from "@supabase/supabase-js";

// const Base_URL = "https://qffaajcfkscthncfwnpt.supabase.co/rest/v1/cabins?select=*"
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZmFhamNma3NjdGhuY2Z3bnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MDM1NDgsImV4cCI6MjA0MjM3OTU0OH0.5LNzwpcI6sxZ5132hjfb3RqHlvJ8pf5fhSNwfnKjHYM";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZmFhamNma3NjdGhuY2Z3bnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4MDM1NDgsImV4cCI6MjA0MjM3OTU0OH0.5LNzwpcI6sxZ5132hjfb3RqHlvJ8pf5fhSNwfnKjHYM";
export const supabaseUrl = "https://qffaajcfkscthncfwnpt.supabase.co";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
