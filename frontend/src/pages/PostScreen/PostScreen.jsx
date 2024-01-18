import React, { useState, useEffect } from "react";
import axios from "axios";
import PostList from "../../components/Posts/PostList/PostList";
import "./PostScreen.css";

function PostScreen() {
  const [posts, setPosts] = useState([]);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem("authToken");
  const getPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setPosts(response.data);
      console.info(response.data);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <PostList posts={posts} />
    </div>
  );
}

export default PostScreen;
