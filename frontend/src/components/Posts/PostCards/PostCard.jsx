import React from "react";
import PropTypes from "prop-types";
import "./PostCard.css";

export default function PostCard({ post }) {
  const url = import.meta.env.VITE_BACKEND_URL;
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <img
            src={`${url}/${post.Image}`}
            alt={post.Title}
            className="card-img-top"
          />
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
    Image: PropTypes.string,
  }).isRequired,
};
