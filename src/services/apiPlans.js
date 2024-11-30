import supabase from "./supabase";
export async function getPlans() {
  let query = supabase.from("plans").select("*");

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  console.log(data);

  return { count, data };
}
