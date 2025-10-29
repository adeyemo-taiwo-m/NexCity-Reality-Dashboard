import supabase from "./supabase";

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data.user;
}

export async function loginUser(userData) {
  console.log(userData);
  let { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    throw new Error("The is an error loggin in", error);
  }

  return data;
}

export async function signUp({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName } },
  });

  if (error) {
    throw new Error("The is an error loggin in", error);
  }

  return data;
}
