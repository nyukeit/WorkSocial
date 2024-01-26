import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";
// import { Toast } from "bootstrap";
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
  const [like, setLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const currentUserID = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  const postCreator = users.find((user) => user.User_ID === post.User_ID);

  if (!postCreator) {
    return <div>Loading...</div>;
  }

  const imageUrl = [
    `${hostname}/upload/${post.Image}`,
    `${hostname}/upload/${postCreator.ProfileImage}`,
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

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

      const response = await fetch(`${hostname}/posts/${post.Post_ID}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // console.info("Post Edited");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
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
        onSubmit={handleEditPost}
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
            <button id="editPost-btn" type="submit">
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${hostname}/posts/${post.Post_ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // console.info("Post Deleted");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
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

  const handlePostLikeDislike = async (action, userId) => {
    if (action === "like") {
      try {
        const response = await fetch(
          `${hostname}/posts/${post.Post_ID}/likes`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );
        if (response.ok) {
          setLike(true);
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    } else if (action === "unlike") {
      try {
        const response = await fetch(
          `${hostname}/posts/${post.Post_ID}/likes`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );
        if (response.ok) {
          setLike(false);
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    }
  };
  useEffect(() => {
    const getLikes = async () => {
      try {
        const response = await fetch(
          `${hostname}/posts/${post.Post_ID}/likes`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length === 0) {
            setLike(false);
            setTotalLikes(0);
          } else {
            setTotalLikes(data.length);

            const userHasLiked = data.some(
              (l) => parseInt(l.User_ID, 10) === parseInt(currentUserID, 10)
            );
            if (userHasLiked) {
              setLike(true);
            }
          }
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    };
    getLikes();
  }, [like, totalLikes]);

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
          {parseInt(currentUserID, 10) === parseInt(postCreator.User_ID, 10) ? (
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
          {!like ? (
            <>
              <button
                name="like"
                type="button"
                onClick={() => handlePostLikeDislike("like", currentUserID)}
              >
                <i className="fa-regular fa-heart" />
              </button>
              <span>{totalLikes}</span>
            </>
          ) : (
            <>
              <button
                name="unlike"
                type="button"
                onClick={() => handlePostLikeDislike("unlike", currentUserID)}
              >
                <i className="fa-solid fa-heart" />
              </button>
              <span>{totalLikes}</span>
            </>
          )}
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
