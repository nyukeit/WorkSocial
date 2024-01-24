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

  const value = useMemo(() => ({ posts, setPosts, getPosts }), [posts]);
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
