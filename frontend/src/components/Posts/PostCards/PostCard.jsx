import React from "react";
import PropTypes from "prop-types";
import "./PostCard.css";
import ImageWithJWT from "../../../utils/ImageWithJWT";
import { hostname } from "../../../HostnameConnect/Hostname";
import { useUser } from "../../../contexts/UserContext";

export default function PostCard({ post }) {
  const { users, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  const postCreator = users.find((user) => user.User_ID === post.User_ID);
  const imageUrl = [
    `${hostname}/upload/${post.Image}`,
    `${hostname}/upload/${postCreator.ProfileImage}`,
  ];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="profile">
            {/* <img src={ProfileImage} alt={Username} className="profile-image" /> */}
            <div className="profileImgDiv">
              <ImageWithJWT className="pcProfileImg" imageUrl={imageUrl[1]} />
            </div>
            <span className="username">{postCreator.Username}</span>
          </div>
        </div>
        <div className="card-img">
          <ImageWithJWT className="post-img" imageUrl={imageUrl[0]} />
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
    User_ID: PropTypes.number.isRequired,
  }).isRequired,
};
