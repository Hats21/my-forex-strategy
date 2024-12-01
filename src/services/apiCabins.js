import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error(error.message);
  return cabins;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/traded_images/${imageName}`;
  console.log(imagePath);
  const tempImagePath =
    "https://uwppoupiylwjzbercgsr.supabase.co/storage/v1/object/public/traded_images/developer-modified.png";
  let query = supabase.from("trades");
  // 1. creating cabin
  if (!id) query = query.insert([{ ...newCabin, image: tempImagePath }]);
  // 2. Edit cabin
  // if (id)
  //   query = query
  //     .update({ ...newCabin, image: imagePath })
  //     .eq("id", id)
  //     .select();
  const { data, error } = await query.select().single();

  if (error) throw new Error(error.message);

  if (hasImagePath) return data;
  // 2. uploading image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await deleteCabin(data.id);
    console.log(storageError);
    throw new Error(storageError.message);
  }
  return data;
}

export async function createTrade(trade) {
  const imageName = `${Math.random()}-${trade.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/traded_images/${imageName}`;
  // 1. creating cabin
  const { data, error } = await supabase
    .from("trades")
    .insert([{ ...trade, image: imagePath }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("trades").delete().eq("id", id);
  if (error) throw new Error("Couldn't delete this trade. Please try again!");
  return data;
}
