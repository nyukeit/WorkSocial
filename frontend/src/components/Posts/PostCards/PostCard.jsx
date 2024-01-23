import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import "./PostCard.css";
import ImageWithJWT from "../../../utils/ImageWithJWT";
import { hostname } from "../../../HostnameConnect/Hostname";
import { useUser } from "../../../contexts/UserContext";
import { usePost } from "../../../contexts/PostContext";

export default function PostCard({ post }) {
  const { getPosts } = usePost();
  const { users, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const currentUser = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  if (loading) return <div>Loading...</div>; // Wait for users to load

  const postCreator = users.find((user) => user.User_ID === post.User_ID);

  const imageUrl = [
    `${hostname}/upload/${post.Image}`,
    `${hostname}/upload/${postCreator.ProfileImage}`,
  ];

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenDelModal = () => {
    setShowDelModal(true);
  };

  const handleCloseDelModal = () => {
    setShowDelModal(false);
  };

  const handleOpenMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  const renderMenu = () => {
    if (isMenuOpen) {
      return (
        <div className="post-menu">
          <button
            className="postMenuBtn"
            type="button"
            onClick={handleOpenModal}
          >
            Edit
          </button>
          <button
            className="postMenuBtn"
            type="button"
            onClick={handleOpenDelModal}
          >
            Delete
          </button>
        </div>
      );
    }
    return null;
  };

  const initialValues = {
    Title: `${post.Title}`,
    Content: `${post.Content}`,
    Image: `${post.Image}`,
    Visibility: `${post.Visibility}`,
    UserID: post.User_ID,
  };

  const handleEditPost = async (values) => {
    const { Title, Content, Image, Visibility } = values;
    try {
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Content", Content);
      formData.append("Visibility", Visibility);
      formData.append("UserID", post.User_ID);
      if (Image && Image instanceof File) {
        formData.append("Image", Image);
      }
      console.info(formData);
      await fetch(`${hostname}/posts/${post.Post_ID}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          <div>Post Updated</div>;
        } else {
          console.error("Erreur lors de la requête:", res.statusText);
        }
      });
      handleCloseModal();
      getPosts();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const renderModal = showModal && (
    <div className="editPostmodal">
      <button className="close-modal" onClick={handleCloseModal} type="button">
        <i className="fa-solid fa-xmark" />
      </button>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await handleEditPost(values);
        }}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form>
            <h4>Create Poste</h4>
            <div className="title-content">
              <Field name="Title" placeholder="Title" type="text" />
              <ErrorMessage name="Title" component="div" className="error" />

              <Field name="Content" type="text" placeholder="Write Post" />
              <ErrorMessage name="Content" component="div" className="error" />
            </div>
            <div className="visibility-group">
              <div className="radio-group">
                <label htmlFor="Visibility">Public</label>
                <Field name="Visibility" type="radio" value="Public" />
                <ErrorMessage name="Public" component="div" className="error" />
              </div>
              <div className="radio-group">
                <label htmlFor="Visibility">Private</label>
                <Field name="Visibility" type="radio" value="Private" />
                <ErrorMessage
                  name="Private"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="img-upload">
              <label htmlFor="Image">📎 Attach Image</label>
              <input
                id="Image"
                name="Image"
                type="file"
                onChange={(event) =>
                  setFieldValue("Image", event.currentTarget.files[0])
                }
              />
            </div>
            <button id="editPost-btn" type="submit" onClick={handleEditPost}>
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  const handleDeletePost = async () => {
    try {
      await fetch(`${hostname}/posts/${post.Post_ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          <div>Post Deleted</div>;
        } else {
          console.error("Erreur lors de la requête:", res.statusText);
        }
      });
      handleCloseDelModal();
      getPosts();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const renderDeleteModal = showDelModal && (
    <div className="deletePostmodal">
      <button
        className="close-modal"
        onClick={handleCloseDelModal}
        type="button"
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <div className="delPostAlert">
        <h3>Are you sure you want to delete this post?</h3>
        <button id="deletePost-btn" type="button" onClick={handleDeletePost}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="profile">
            <div className="profileImgDiv">
              <ImageWithJWT className="pcProfileImg" imageUrl={imageUrl[1]} />
            </div>
            <span className="username">{postCreator.Username}</span>
          </div>
          {parseInt(currentUser, 10) === parseInt(postCreator.User_ID, 10) ? (
            <div className="context-menu">
              <button
                className="context-btn"
                type="button"
                onClick={handleOpenMenu}
              >
                <i className="fa-solid fa-ellipsis-vertical" />
              </button>
            </div>
          ) : null}
          {renderMenu()}
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
      {renderModal}
      {renderDeleteModal}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Content: PropTypes.string.isRequired,
    Image: PropTypes.string,
    Post_ID: PropTypes.number.isRequired,
    Visibility: PropTypes.string.isRequired,
    User_ID: PropTypes.number.isRequired,
  }).isRequired,
};
