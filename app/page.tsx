import AddPost from "@/components/posts/AddPost";
import Post from "@/components/posts/Post";
import { getPosts } from "@/lib/actions/posts";
import { getUser } from "@/lib/actions/users";

export default async function Home() {
  const user = await getUser();

  let posts = null;
  let error = null;

  try {
    posts = await getPosts();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load posts";
    console.error(error);
  }

  return (
    <div className="container mx-auto w-full py-12 px-4 lg:px-0">
      {user && <AddPost />}

      {error && (
        <div className="max-w-2xl mx-auto p-4 my-4 bg-destructive text-destructive-foreground rounded-lg">
          {error}
        </div>
      )}

      {posts && posts.length === 0 && (
        <div className="max-w-2xl mx-auto p-4 text-center text-muted-foreground">
          No posts yet
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="flex flex-col w-full gap-14">
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
    </div>
  );
}
