"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { PostWithAuthor } from "../types/types";
import { getUser } from "./users";

export async function getPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    *,  
    author:profiles(id, username, avatar_url, created_at)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data as PostWithAuthor[];
}

export async function createPost(previousState: unknown, formData: FormData) {
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File;
  const supabase = await createClient();
  const userId = (await getUser())?.id;

  // Upload image to storage
  let imageUrl = null;
  if (imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("post_images")
      .upload(fileName, imageFile);
    if (error) throw new Error(`Error uploading image: ${error.message}`);

    const { data: urlData } = supabase.storage
      .from("post_images")
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  // Create post
  const { error } = await supabase.from("posts").insert([
    {
      user_id: userId,
      content: content?.trim() || null,
      image_url: imageUrl,
    },
  ]);

  if (error) return "Failed to create post";

  revalidatePath("/");
}
