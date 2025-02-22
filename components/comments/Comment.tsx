import type { CommentWithAuthor } from "@/lib/types/types";
import { formatDate } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";

export default function Comment({ comment }: { comment: CommentWithAuthor }) {
  return (
    <div className="py-6">
      <div className="flex gap-2 items-center p-2">
        {comment.author.avatar_url ? (
          <Image
            src={comment.author.avatar_url}
            alt="Avatar"
            width={40}
            height={40}
            className="size-6 rounded-full bg-transparent"
          />
        ) : (
          <User className="size-6" />
        )}
        <div className="flex items-center justify-between w-full">
          <span className="text-base font-semibold">
            {comment.author.username}
          </span>
          <span className="text-xs text-muted-foreground pl-1">
            {formatDate(comment.created_at)}
          </span>
        </div>
      </div>
      <div className="px-2 w-fit">
        {comment.content && (
          <div className="pb-2 text-sm">{comment.content}</div>
        )}
        {comment.image_url && (
          <Image
            src={comment.image_url}
            alt="Comment Image"
            width={100}
            height={100}
            className="rounded-lg mx-auto w-32 max-h-32 object-cover h-auto"
          />
        )}
      </div>
    </div>
  );
}
