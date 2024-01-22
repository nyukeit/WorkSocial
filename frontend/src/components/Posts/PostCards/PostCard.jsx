import React from "react";
import PropTypes from "prop-types";
import "./PostCard.css";
import ImageWithJWT from "../../../utils/ImageWithJWT";

export default function PostCard({ post }) {
  const imageUrl = `http://localhost:5000/upload/${post.Image}`;

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="profile">
            {/* <img src={ProfileImage} alt={Username} className="profile-image" /> */}
            <div className="profileImg-placeholder">0</div>
            <span className="username">Dummy User</span>
          </div>
        </div>
        <div className="card-img">
          <ImageWithJWT className="post-img" imageUrl={imageUrl} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{post.Title}</h5>
          <p className="card-text">{post.Content}</p>
        </div>
        <div className="card-actions">
          <button className="like" type="button">
            <i className="fa-regular fa-heart" />
          </button>
          <button className="comment" type="button">
            <i className="fa-regular fa-comment" />
          </button>
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
