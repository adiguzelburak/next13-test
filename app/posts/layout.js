import Link from "next/link";
import { use } from "react";

async function getPosts() {
  let posts = await fetch("https://dummyjson.com/posts?limit=5");
  return posts.json();
}
export default function Layout({ children }) {
  let { posts } = use(getPosts());
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
