import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  console.log(data);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  console.log(session);
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data, error);
  if (error) throw new Error(error.message);

  console.log(data);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  console.log(error);
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  // 1. update password or fullName
  let updateObj;
  if (password) updateObj = { password };
  if (fullName)
    updateObj = {
      data: {
        fullName,
      },
    };
  // 2. upload avatar
  const { data, error } = await supabase.auth.updateUser(updateObj);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // 3. update avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: errorUploading } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (errorUploading) {
    console.log(errorUploading);
    throw new Error(errorUploading.message);
  }

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `https://qffaajcfkscthncfwnpt.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  console.log(updatedUser);
  return updatedUser;
}
