import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./PostCard.css";

export default function PostCard({ post }) {
  const [imageString, setImageString] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;
  const getBase64Img = async (res) => {
    const blob = await res.blob();
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return reader.result;
  };

  useEffect(() => {
    fetch(`${url}/upload/${post.Image}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then(getBase64Img)
      .then((imgString) => setImageString(imgString));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-img">
          <img src={imageString} alt={post.Title} className="postImage" />
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
