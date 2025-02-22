"use client";

import { CommentWithAuthor } from "@/lib/types/types";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { startTransition, useOptimistic, useState } from "react";
import { createComment } from "@/lib/actions/comments";
import { User } from "@supabase/supabase-js";
import { useAuth } from "../providers/AuthProvider";
import { Button } from "../ui/button";
import { toast } from "sonner";

export type addCommentParams = {
  comment: string | null;
  image: File | null;
  postId: string;
  user: User;
};

export default function Comments({
  comments,
  postId,
}: {
  comments: CommentWithAuthor[];
  postId: string;
}) {
  const { user } = useAuth();
  const [commentsLimit, setCommentsLimit] = useState(5);
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (state: CommentWithAuthor[], newComment: CommentWithAuthor) => {
      return [...state, newComment];
    }
  );

  function handleIncreaseLimit() {
    setCommentsLimit((prev) => prev + 5);
  }

  async function addComment({
    comment,
    image,
    postId,
    user,
  }: addCommentParams) {
    const newComment = {
      id: crypto.randomUUID(),
      content: comment,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_url: image ? URL.createObjectURL(image) : null,
      author: {
        id: user.id,
        username: user.user_metadata.user_name,
        avatar_url: user.user_metadata.avatar_url,
        created_at: user.created_at,
      },
      post_id: postId,
      user_id: user.id,
    };

    startTransition(() => {
      setOptimisticComments(newComment);
    });

    try {
      await createComment({ postId, content: comment, imageFile: image });
      comments.push(newComment);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    }
  }

  return (
    <>
      <div className="bg-zinc-900 rounded-md mx-2 relative">
        <div className="divide-y-2 divide-stone-800 px-2">
          {optimisticComments.slice(0, commentsLimit).map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>

        {optimisticComments.length > commentsLimit && (
          <>
            <div className="bg-gradient-to-t from-background to-transparent h-8 w-full absolute bottom-0"></div>
            <Button
              className="w-fit rounded-xl bg-background border mx-auto absolute left-0 right-0 bottom-2"
              variant="ghost"
              size="sm"
              onClick={handleIncreaseLimit}
            >
              Shore More
            </Button>
          </>
        )}
        <div></div>
      </div>
      {user && <AddComment postId={postId} addComment={addComment} />}
    </>
  );
}
