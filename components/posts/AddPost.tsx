"use client";

import { Paperclip, X } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect, useMemo, useActionState } from "react";
import { createPost } from "@/lib/actions/posts";
import Image from "next/image";

export default function AddPost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, formAction, isPending] = useActionState(createPost, "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    if (!isPending && !error) {
      setText("");
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [isPending, error]);

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

  function handlePaperclipClick() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <div className="flex flex-col rounded-lg border max-w-2xl mx-auto p-4 mb-12">
        <h3 className="font-bold text-2xl">Create post</h3>
        <span className="text-xs text-muted-foreground self-end">
          {text.length}/500
        </span>
        <form action={formAction}>
          <div className="flex flex-col">
            <div className="">
              <Textarea
                className="resize-none"
                maxLength={500}
                placeholder="Could be anything!"
                value={text}
                name="content"
                onChange={(e) => setText(e.target.value)}
                disabled={isPending}
              />
              {imageUrl && (
                <div className="mt-2 relative">
                  <Image
                    src={imageUrl}
                    alt="Selected Image"
                    width={200}
                    height={200}
                    className="w-full object-contain max-h-[500px]"
                  />
                  <button
                    className="absolute top-2 right-2 bg-background/60 p-1 rounded-lg"
                    onClick={() => setImage(null)}
                    disabled={isPending}
                  >
                    <X />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-4">
              <Button
                className="w-full font-medium"
                disabled={isPending}
                type="submit"
              >
                Post
              </Button>
              <Button
                size={"icon"}
                variant={"ghost"}
                title="Upload Image"
                type="button"
                onClick={handlePaperclipClick}
                disabled={isPending}
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
                disabled={isPending}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
