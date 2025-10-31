import supabase, { supabaseUrl } from "./supabase";

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
  let imagePath = "";

  try {
    // 1. Upload image if it exists and is a File
    if (profileImage && profileImage.file instanceof File) {
      const imageFile = profileImage.file;
      const imageName = `${Date.now()}-${imageFile.name}`; // simpler & safer unique name
      const filePath = `avatars/${imageName}`; // folder in bucket (optional but clean)

      const { data: imageData, error: imageError } = await supabase.storage
        .from("user") // 👈 make sure your bucket name matches exactly
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) throw imageError;

      // Construct full public URL
      imagePath = `${supabaseUrl}/storage/v1/object/public/user/${imageData.path}`;
      console.log("Uploaded image URL:", imagePath);
    } else {
      console.log("ℹNo image file to upload or invalid file type");
    }

    // 2. Prepare metadata
    if (fullName) userMeta.fullName = fullName;
    if (imagePath) userMeta.profileImage = imagePath;
    if (assignedRole) userMeta.assignedRole = assignedRole;
    if (phone) userMeta.phone = phone;

    if (socialLinks) {
      userMeta.socialLinks = {
        facebook: socialLinks.facebook || "",
        linkedIn: socialLinks.linkedIn || "",
        pinterest: socialLinks.pinterest || "",
        x: socialLinks.x || "",
      };
    }

    if (Object.keys(userMeta).length > 0) updatePayload.data = userMeta;
    if (email) updatePayload.email = email;
    if (newPassword) updatePayload.password = newPassword;

    // 3. Update user info in Supabase Auth
    const { data, error: updateError } = await supabase.auth.updateUser(
      updatePayload
    );
    if (updateError) throw new Error(updateError);

    console.log("User updated successfully:", data);
    return data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw new Error("There was an error updating user: " + err.message);
  }
}
