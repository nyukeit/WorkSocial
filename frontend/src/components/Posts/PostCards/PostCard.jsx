import React from "react";
import PropTypes from "prop-types";
import "./PostCard.css";

export default function PostCard({ post }) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{post.Title}</h5>
          <p className="card-text">{post.Content}</p>
        </div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Content: PropTypes.string.isRequired,
  }).isRequired,
};
