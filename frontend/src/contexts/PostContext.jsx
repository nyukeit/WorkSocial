// PostProvider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { hostname } from "../HostnameConnect/Hostname";

const PostContext = createContext(null);

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("userToken");

  const getPosts = async () => {
    try {
      await fetch(`${hostname}/posts`, {
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
          `${hostname}/posts/${post.Post_ID}/comments`,
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
      console.info(flattenedComments);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const value = useMemo(
    () => ({ posts, setPosts, getPosts, comments, getComments }),
    [posts, comments]
  );
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
