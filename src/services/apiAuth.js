import supabase from "./supabase";

export async function getUser() {
  const { data: sessionInStorage } = await supabase.auth.getSession();
  if (!sessionInStorage.session) return null;
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return data.user;
}

// Login
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

// Log out
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error("There is an error while signing up");
  }
}

// sign in
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

// update user
export async function updateCurrentUser({
  fullName,
  profileImage,
  assignedRole,
  phone,
  email,
  newPassword,
  socialLinks,
}) {
  const updatePayload = {};
  const userMeta = {};
  console.log(profileImage);
  // Basic profile data
  if (fullName) userMeta.fullName = fullName;
  if (profileImage) userMeta.profileImage = profileImage;
  if (assignedRole) userMeta.assignedRole = assignedRole;
  if (phone) userMeta.phone = phone;

  // Social media links (only add if provided)
  if (socialLinks) {
    userMeta.socialLinks = {
      facebook: socialLinks.facebook || "",
      linkedin: socialLinks.linkedin || "",
      pinterest: socialLinks.pinterest || "",
      x: socialLinks.x || "",
    };
  }

  // Add metadata if any
  if (Object.keys(userMeta).length > 0) {
    updatePayload.data = userMeta;
  }

  // Update email if provided
  if (email) updatePayload.email = email;

  // Update password if provided
  if (newPassword) updatePayload.password = newPassword;

  // Perform update
  const { data, error } = await supabase.auth.updateUser(updatePayload);

  if (error) {
    throw new Error("There was an error updating user: " + error.message);
  }

  return data;
}
