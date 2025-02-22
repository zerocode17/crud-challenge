"use client";

import { Paperclip, Send, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useAuth } from "../providers/AuthProvider";
import { addCommentParams } from "./Comments";

interface AddCommentProps {
  postId: string;
  addComment: ({ comment, image, postId, user }: addCommentParams) => void;
}

export default function AddComment({ postId, addComment }: AddCommentProps) {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const imageUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  function handlePaperclipClick() {
    fileInputRef.current?.click();
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        return;
      }
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        return;
      }
      setImage(file);
    }
  }

  return (
    <div className="mt-2">
      {imageUrl && (
        <div className="mt-2 relative w-fit">
          <Image
            src={imageUrl}
            alt="Selected Image"
            width={80}
            height={80}
            className="object-fill max-w-32 max-h-32 w-full rounded-lg"
          />
          <button
            className="absolute top-1 right-1 bg-background/60 p-0.5 rounded-lg"
            onClick={() => setImage(null)}
          >
            <X className="size-4" />
          </button>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!user) return;

          const currentComment = comment;
          const currentImage = image;
          setComment("");
          setImage(null);

          addComment({
            comment: currentComment,
            image: currentImage,
            postId,
            user,
          });
        }}
        className="flex items-center space-x-2 mt-2"
      >
        <Input
          placeholder="Add a comment"
          type="text"
          className=" bg-secondary text-secondary-foreground"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          max={250}
        />
        <Button
          size={"icon"}
          variant={"ghost"}
          title="Upload Image"
          type="button"
          onClick={handlePaperclipClick}
        >
          <Paperclip />
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          name="image"
        />
        <Button size={"icon"} variant={"ghost"} title="Send" type="submit">
          <Send className="!size-5" />
        </Button>
      </form>
    </div>
  );
}
