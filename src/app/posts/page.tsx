"use client";

import usePosts from "../views/lib/hooks/usePosts";

export default function PostsPage() {
  const { data: posts, error, isLoading } = usePosts();
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
  //     {
  //       cache: "no-store", // Prevents caching for fresh data
  //     }
  //   );

  if (error) {
    return <p>Failed to load posts</p>;
  }

  //   const posts = await response.json();

  return (
    <div>
      <h1>{isLoading ? "Loading" : "Posts"}</h1>
      {posts && !isLoading && (
        <ul>
          {posts.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
