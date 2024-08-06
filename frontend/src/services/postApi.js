import { useQuery } from "@tanstack/react-query";
import headers from "../utils/apiHeaders";

// Get Posts
export const getPosts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts`,
    headers
  );
  const posts = await response.json();
  return posts;
};

// Save Posts to cache
const allPosts = useQuery({
  queryKey: ["posts"],
  queryFn: getPosts,
});

// Use Cached Posts to get Likes
export const getPostLikes = async () => {
  allPosts.map(async (p) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/:${p.Post_ID}/likes`,
      headers
    );
    const postLikes = await response.json();
    return postLikes;
  });
};

// Use Cached Posts to get Comments
export const getPostComments = async () => {
  allPosts.map(async (p) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/:${p.Post_ID}/comments`,
      headers
    );
    const postComments = await response.json();
    return postComments;
  });
};
