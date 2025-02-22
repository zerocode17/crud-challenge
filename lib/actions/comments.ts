"use server";

import { createClient } from "../supabase/server";
import { getUser } from "./users";
import type { CommentWithAuthor } from "../types/types";

type CreateCommentParams = {
  postId: string;
  content: string | null;
  imageFile: File | null;
};

export async function createComment({
  postId,
  content,
  imageFile,
}: CreateCommentParams) {
  const userId = (await getUser())?.id;

  if (!userId || (!content && !imageFile) || !postId) {
    console.error("Invalid data");
    return;
  }

  const supabase = await createClient();

  // Upload image to storage
  let imageUrl = null;
  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("comment_images")
      .upload(fileName, imageFile);
    if (error) throw new Error(`Error uploading image: ${error.message}`);

    const { data: urlData } = supabase.storage
      .from("comment_images")
      .getPublicUrl(fileName);

    imageUrl = urlData.publicUrl;
  }

  // Create comment
  const { error } = await supabase.from("comments").insert([
    {
      user_id: userId,
      post_id: postId,
      content: content?.trim() || null,
      image_url: imageUrl,
    },
  ]);

  if (error) throw error;
}

export async function getComments(postId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(`*, author:profiles(id, username, avatar_url)`)
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }

  return data as CommentWithAuthor[];
}
