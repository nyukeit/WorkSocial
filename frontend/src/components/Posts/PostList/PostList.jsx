import React from "react";
import PropTypes from "prop-types";
import PostCard from "../PostCards/PostCard";
import "./PostList.css";

export default function PostList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.Post_ID} post={post} />
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      Post_ID: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      Content: PropTypes.string.isRequired,
    })
  ).isRequired,
};
