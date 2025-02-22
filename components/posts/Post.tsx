import { User } from "lucide-react";
import type { PostWithAuthor } from "@/lib/types/types";
import Image from "next/image";
import { getComments } from "@/lib/actions/comments";
import { formatDate } from "@/lib/utils";
import Comments from "../comments/Comments";

export default async function Post({ post }: { post: PostWithAuthor }) {
  const comments = await getComments(post.id);

  return (
    <div className="flex flex-col gap-4 rounded-lg border max-w-2xl w-full mx-auto p-4">
      <div className=" flex gap-2 items-center">
        {post.author.avatar_url ? (
          <Image
            src={post.author.avatar_url}
            alt="Avatar"
            width={40}
            height={40}
            className="size-10 rounded-full bg-transparent"
          />
        ) : (
          <User className="size-10" />
        )}
        <div className="flex flex-col ">
          <span className="text-xl font-semibold">{post.author.username}</span>
          <span className="text-xs text-muted-foreground">
            {formatDate(post.created_at)}
          </span>
        </div>
      </div>
      {post.content && <div className="">{post.content}</div>}
      {post.image_url && (
        <Image
          src={post.image_url}
          alt="Post Image"
          width={400}
          height={400}
          className="rounded-lg w-full max-h-[700px] mx-auto object-cover"
        />
      )}
      <div>
        <Comments comments={comments} postId={post.id} />
      </div>
    </div>
  );
}
