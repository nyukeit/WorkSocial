// PostCommentProvider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { hostname } from "../HostnameConnect/Hostname";
import { usePost } from "./PostContext";

const PostCommentContext = createContext(null);

export function usePostComment() {
  return useContext(PostCommentContext);
}

export function PostCommentProvider({ children }) {
  const [postComments, setPostComments] = useState([]);
  const { posts } = usePost();
  console.info(posts);
  const token = localStorage.getItem("userToken");

  const getPostComments = async () => {
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
          const data = await response.json(Promise.all(commentRequests));
          const flattenedComments = data.flat();
          setPostComments(flattenedComments);
          console.info(flattenedComments);
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
          return [];
        }
        return null; // To be changed
      });
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const value = useMemo(
    () => ({ postComments, setPostComments, getPostComments }),
    [postComments, getPostComments]
  );
  return (
    <PostCommentContext.Provider value={value}>
      {children}
    </PostCommentContext.Provider>
  );
}

PostCommentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
