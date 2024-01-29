// Import Modules
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";

// Import Styles
import "./PostCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import { Form as MyForm } from "react-bootstrap";

// Import Utitlities
import ImageWithJWT from "../../../utils/ImageWithJWT";
import { hostname } from "../../../HostnameConnect/Hostname";

// Import Contexts
import { useUser } from "../../../contexts/UserContext";
import { usePost } from "../../../contexts/PostContext";

export default function PostCard({ post }) {
  const { getPosts } = usePost();
  const { users, loading } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [like, setLike] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [comment, setComment] = useState(""); // Ecrire un commentaire
  const [comments, setComments] = useState(""); // Afficher les commentaires
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

  const getLikes = async () => {
    try {
      const response = await fetch(`${hostname}/posts/${post.Post_ID}/likes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const getComments = async () => {
    try {
      const response = await fetch(
        `${hostname}/posts/${post.Post_ID}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length === 0) {
          setComments([]);
        } else {
          setComments(data);
        }
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  useEffect(() => {
    getLikes();
    getComments();
  }, []);

  // Handle Modals
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenDelModal = () => setShowDelModal(true);
  const handleCloseDelModal = () => setShowDelModal(false);
  const handleOpenCommentModal = () => setShowCommentModal(true);
  const handleCloseCommentModal = () => setShowCommentModal(false);

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
          getLikes();
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
          getLikes();
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${hostname}/posts/${post.Post_ID}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );
      if (response.ok) {
        console.info("Comment Added");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
      setComment("");
      getComments();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  return (
    <div>
      <Card>
        <div className="card-header">
          <div className="profile">
            <div className="profileImgDiv">
              <ImageWithJWT className="pcProfileImg" imageUrl={imageUrl[1]} />
            </div>
            <span className="username">{postCreator.Username}</span>
          </div>
          {parseInt(currentUserID, 10) === parseInt(postCreator.User_ID, 10) ? (
            <DropdownButton id="context-menu-btn">
              <Dropdown.Item onClick={handleOpenModal}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={handleOpenDelModal}>Delete</Dropdown.Item>
            </DropdownButton>
          ) : null}
        </div>
        <Card.Body>
          <div className="card-img">
            <ImageWithJWT className="post-img" imageUrl={imageUrl[0]} />
          </div>
          {!like ? (
            <button
              className="action-btn"
              name="like"
              type="button"
              onClick={() => handlePostLikeDislike("like", currentUserID)}
            >
              <i className="fa-regular fa-heart" />
              <span className="action-btn-text">{totalLikes}</span>
            </button>
          ) : (
            <>
              <button
                className="action-btn"
                name="unlike"
                type="button"
                onClick={() => handlePostLikeDislike("unlike", currentUserID)}
              >
                <i className="fa-solid fa-heart" />
              </button>
              <span className="action-btn-text">{totalLikes}</span>
            </>
          )}
          <button
            className="action-btn"
            type="button"
            onClick={handleOpenCommentModal}
          >
            <i className="fa-regular fa-comment" />
          </button>
          <Card.Title>{post.Title}</Card.Title>
          <Card.Text>{post.Content}</Card.Text>
          <Card.Link
            onClick={handleOpenCommentModal}
            className="view-comments-btn"
          >
            View All Comments
          </Card.Link>
          <MyForm className="submit-comment-form">
            <MyForm.Control
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleComment}
            />
            <button
              id="submit-comment-btn"
              type="submit"
              onClick={handleSubmitComment}
            >
              Post
            </button>
          </MyForm>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal} className="modals">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleEditPost}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="title-content">
                  <label htmlFor="Title">Title</label>
                  <Field
                    name="Title"
                    placeholder="Title"
                    type="text"
                    className="form-control"
                  />
                  <label htmlFor="Content">Content</label>
                  <Field
                    name="Content"
                    component="textarea"
                    rows="3"
                    placeholder="Write Post"
                    className="form-control"
                  />
                </div>
                <div className="visibility-group">
                  <div className="radio-group">
                    <Field name="Visibility" type="radio" value="Public" />
                    <label htmlFor="Visibility">Public</label>
                  </div>
                  <div className="radio-group">
                    <Field name="Visibility" type="radio" value="Private" />
                    <label htmlFor="Visibility">Private</label>
                  </div>
                </div>
                <div className="img-upload">
                  <label htmlFor="Image">
                    <i className="fa-solid fa-image" />
                    Attach Image
                  </label>
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
        </Modal.Body>
      </Modal>
      <Modal
        show={showDelModal}
        onHide={handleCloseDelModal}
        className="modals"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showCommentModal}
        onHide={handleCloseCommentModal}
        className="modals"
      >
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            comments.map((ct) => (
              <div className="comment" key={ct.Comment_ID}>
                {/* <ImageWithJWT
                  imageUrl={`${hostname}/upload/${commentCreator.ProfileImage}`}
                /> */}
                <p>{ct.Comment}</p>
              </div>
            ))
          )}

          <MyForm className="submit-comment-form">
            <MyForm.Control
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleComment}
            />
            <button
              id="submit-comment-btn"
              type="submit"
              onClick={handleSubmitComment}
            >
              <i className="fa-regular fa-paper-plane" />
            </button>
          </MyForm>
        </Modal.Body>
      </Modal>
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
