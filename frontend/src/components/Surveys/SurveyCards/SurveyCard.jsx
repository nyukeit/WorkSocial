import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import "./SurveyCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import { Form as MyForm } from "react-bootstrap";
import ImageWithJWT from "../../../utils/ImageWithJWT";
import { hostname } from "../../../HostnameConnect/Hostname";
import { useUser } from "../../../contexts/UserContext";
import { useSurvey } from "../../../contexts/SurveyContext";

export default function SurveyCard({ survey }) {
  const { getSurveys } = useSurvey();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const surveyCreator = users.find((user) => user.User_ID === survey.User_ID);

  if (!surveyCreator) {
    return <div>Loading...</div>;
  }

  const imageUrl = [
    `${hostname}/upload/${survey.Image}`,
    `${hostname}/upload/${surveyCreator.ProfileImage}`,
  ];

  // Handle Modals
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenDelModal = () => setShowDelModal(true);
  const handleCloseDelModal = () => setShowDelModal(false);
  const handleOpenCommentModal = () => setShowCommentModal(true);
  const handleCloseCommentModal = () => setShowCommentModal(false);

  // Handle Fetch Likes & Comments
  const getLikes = async () => {
    try {
      const response = await fetch(
        `${hostname}/surveys/${survey.Survey_ID}/likes`,
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

  const getComments = async () => {
    try {
      const response = await fetch(
        `${hostname}/surveys/${survey.Survey_ID}/comments`,
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

  // Handle Post Like / Dislike
  const handleSurveyLikeDislike = async (action, userId) => {
    if (action === "like") {
      try {
        const response = await fetch(
          `${hostname}/surveys/${survey.Survey_ID}/likes`,
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
          `${hostname}/surveys/${survey.Survey_ID}/likes`,
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

  // Handle Survey Comment
  const handleComment = (e) => setComment(e.target.value);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${hostname}/surveys/${survey.Survey_ID}/comments`,
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

  // Handle Edit Survey
  const initialValues = {
    Title: `${survey.Title}`,
    Content: `${survey.Content}`,
    Image: `${survey.Image}`,
    Visibility: `${survey.Visibility}`,
    Option1: `${survey.Option1}`,
    Option2: `${survey.Option2}`,
    Option3: `${survey.Option3}`,
    Option4: `${survey.Option4}`,
    UserID: survey.User_ID,
  };

  const handleEditSurvey = async (values) => {
    const {
      Title,
      Content,
      Image,
      Visibility,
      Option1,
      Option2,
      Option3,
      Option4,
    } = values;
    try {
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Content", Content);
      formData.append("Visibility", Visibility);
      formData.append("UserID", survey.User_ID);
      formData.append("Option1", Option1);
      formData.append("Option2", Option2);
      formData.append("Option3", Option3);
      formData.append("Option4", Option4);
      if (Image && Image instanceof File) {
        formData.append("Image", Image);
      }
      console.info(formData);
      const response = await fetch(`${hostname}/surveys/${survey.Survey_ID}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.info("Survey Edited");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
      handleCloseModal();
      getSurveys();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  // Handle Delete Survey
  const handleDeleteSurvey = async () => {
    try {
      const response = await fetch(`${hostname}/surveys/${survey.Survey_ID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.info("Survey Deleted");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
      handleCloseDelModal();
      getSurveys();
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
            <span className="username">{surveyCreator.Username}</span>
          </div>
          {parseInt(currentUserID, 10) ===
          parseInt(surveyCreator.User_ID, 10) ? (
            <DropdownButton id="context-menu-btn">
              <Dropdown.Item onClick={handleOpenModal}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={handleOpenDelModal}>Delete</Dropdown.Item>
            </DropdownButton>
          ) : null}
        </div>
        <Card.Body>
          <div className="card-img">
            <ImageWithJWT imageUrl={imageUrl[0]} />
          </div>
          {!like ? (
            <button
              className="action-btn"
              name="like"
              type="button"
              onClick={() => handleSurveyLikeDislike("like", currentUserID)}
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
                onClick={() => handleSurveyLikeDislike("unlike", currentUserID)}
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
          <div className="card-body">
            <h5 className="card-title">{survey.Title}</h5>
            <p className="card-text">{survey.Content}</p>
          </div>
          <div className="survey-options">
            <form>
              <div className="options-group">
                <div className="surveyOption">
                  <input name="Options" type="radio" />
                  <label htmlFor="Option1">{survey.Option1}</label>
                </div>
                <div className="surveyOption">
                  <input name="Options" type="radio" />
                  <label htmlFor="Option2">{survey.Option2}</label>
                </div>
                {survey.Option3 ? (
                  <div className="surveyOption">
                    <input name="Options" type="radio" />
                    <label htmlFor="Option3">{survey.Option3}</label>
                  </div>
                ) : null}
                {survey.Option4 ? (
                  <div className="surveyOption">
                    <input name="Options" type="radio" />
                    <label htmlFor="Option4">{survey.Option4}</label>
                  </div>
                ) : null}
              </div>
              <div className="submit-survey">
                <button name="submit" type="submit">
                  Vote
                </button>
              </div>
            </form>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal} className="modals">
        <Modal.Header closeButton>
          <Modal.Title>Edit Survey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleEditSurvey}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form>
                <div className="title-content">
                  <Field
                    name="Title"
                    placeholder="Title"
                    type="text"
                    className="form-control"
                  />
                  <Field
                    name="Content"
                    component="textarea"
                    rows="3"
                    placeholder="Write Survey"
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
                <div className="options-group">
                  <label htmlFor="Option1">Option 1</label>
                  <Field name="Option1" type="text" className="form-control" />
                  <label htmlFor="Option2">Option 2</label>
                  <Field name="Option2" type="text" className="form-control" />
                  <label htmlFor="Option3">Option 3</label>
                  <Field name="Option3" type="text" className="form-control" />
                  <label htmlFor="Options4">Option 4</label>
                  <Field name="Option4" type="text" className="form-control" />
                </div>
                <div className="img-upload">
                  <label htmlFor="Image">
                    <i className="fa-solid fa-image" /> Attach Image
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
                <button id="editSurvey-btn" type="submit">
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
          <Button variant="danger" onClick={handleDeleteSurvey}>
            Delete
          </Button>
        </Modal.Footer>
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
          <Button variant="danger" onClick={handleDeleteSurvey}>
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

SurveyCard.propTypes = {
  survey: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Content: PropTypes.string.isRequired,
    Image: PropTypes.string,
    Survey_ID: PropTypes.number.isRequired,
    Visibility: PropTypes.string.isRequired,
    User_ID: PropTypes.number.isRequired,
    Option1: PropTypes.string.isRequired,
    Option2: PropTypes.string.isRequired,
    Option3: PropTypes.string,
    Option4: PropTypes.string,
  }).isRequired,
};
