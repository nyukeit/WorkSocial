// PostProvider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const PostContext = createContext(null);

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  // Variables

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem("userToken");

  const getPosts = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json().then((data) => setPosts(data)));
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const getComments = async () => {
    try {
      const commentRequests = posts.map(async (post) => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${post.Post_ID}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          return response.json();
        }
        return null;
      });

      const allComments = await Promise.all(commentRequests);
      const flattenedComments = allComments.flat();
      setComments(flattenedComments);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const getLikes = async () => {
    try {
      const likeRequests = posts.map(async (post) => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/posts/${post.Post_ID}/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          return response.json();
        }
        return null;
      });

      const allLikes = await Promise.all(likeRequests);
      const flattenedLikes = allLikes.flat();
      setLikes(flattenedLikes);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const value = useMemo(
    () => ({ posts, getPosts, comments, getComments, likes, getLikes }),
    [posts, comments, likes]
  );
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
