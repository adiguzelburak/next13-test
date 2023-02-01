"use client"
import { use } from "react";
import useSWR from "swr";

async function getPosts(id) {
  let post = await fetch(`https://dummyjson.com/posts/${id}`);
  return post.json();
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Page({ params }) {
  // console.log(params);
  let id = params.id;
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/posts/${id}`,
    fetcher
  );

  // let post = use(getPosts(id));
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>{/* {post.title} <br /> {post.body} */}</div>;
}
