import { Database } from "./supabase";

type Author = Database["public"]["Tables"]["profiles"]["Row"];

export type PostWithAuthor = Database["public"]["Tables"]["posts"]["Row"] & {
  author: Author;
};

export type CommentWithAuthor =
  Database["public"]["Tables"]["comments"]["Row"] & {
    author: Author;
  };
