import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import "./SurveyCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import ProgressBar from "react-bootstrap/ProgressBar";
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
  const [votes, setVotes] = useState(0);
  const [votedOption, setvotedOption] = useState("");
  const [userHasVoted, setUserHasVoted] = useState(false);
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

  // Handle Fetch Likes, Comments & Votes
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

  const getVotes = async () => {
    try {
      const response = await fetch(
        `${hostname}/surveys/${survey.Survey_ID}/votes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setVotes(data);
        console.info(votes);
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const option1Votes =
    votes.length > 0
      ? Math.ceil(
          (votes.filter((vote) => vote.Voted_For === "Option1").length /
            votes.length) *
            100
        )
      : 0;
  const option2Votes =
    votes.length > 0
      ? Math.ceil(
          (votes.filter((vote) => vote.Voted_For === "Option2").length /
            votes.length) *
            100
        )
      : 0;
  const option3Votes =
    votes.length > 0
      ? Math.ceil(
          (votes.filter((vote) => vote.Voted_For === "Option3").length /
            votes.length) *
            100
        )
      : 0;
  const option4Votes =
    votes.length > 0
      ? Math.ceil(
          (votes.filter((vote) => vote.Voted_For === "Option4").length /
            votes.length) *
            100
        )
      : 0;

  useEffect(() => {
    getLikes();
    getComments();
    getVotes();
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

  const handleOptionChange = (e) => setvotedOption(e.target.value);

  const handleVote = async (e) => {
    e.preventDefault();

    // Check if user has already voted
    const voteCreator =
      votes.length > 0 ? votes.find((vote) => vote.User_ID) : null;

    if (voteCreator && voteCreator.User_ID === currentUserID) {
      console.error("You have already voted.");
      setUserHasVoted(true);
      return;
    }

    // Check if an option is selected
    if (votedOption) {
      console.info("Selected Vote:", votedOption);

      try {
        const response = await fetch(
          `${hostname}/surveys/${survey.Survey_ID}/votes`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              votedOption,
              userId: currentUserID,
            }),
          }
        );

        if (response.ok) {
          console.info("Vote Added");
          setUserHasVoted(true);
          getVotes();
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    } else {
      console.error("Please select an option before voting.");
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
          <h5 className="card-title">{survey.Title}</h5>
          <p className="card-text">{survey.Content}</p>
          <div className="survey-options">
            {userHasVoted ? (
              <div className="voting-results">
                <div className="vote-result">
                  <ProgressBar now={option1Votes > 0 ? option1Votes : 0} />
                  <span>{survey.Option1}</span>
                </div>
                <div className="vote-result">
                  <ProgressBar now={option2Votes > 0 ? option2Votes : 0} />
                  <span>{survey.Option2}</span>
                </div>
                {survey.Option3 ? (
                  <div className="vote-result">
                    <ProgressBar now={option3Votes > 0 ? option3Votes : 0} />
                    <span>{survey.Option3}</span>
                  </div>
                ) : null}
                {survey.Option4 ? (
                  <div className="vote-result">
                    <ProgressBar now={option4Votes > 0 ? option4Votes : 0} />
                    <span>{survey.Option4}</span>
                  </div>
                ) : null}
              </div>
            ) : (
              <MyForm>
                <div className="options-group">
                  <div className="surveyOption">
                    <input
                      name="surveyOption"
                      type="radio"
                      className="form-check-input"
                      value="Option1"
                      checked={votedOption === "Option1"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="Option1">{survey.Option1}</label>
                  </div>
                  <div className="surveyOption">
                    <input
                      name="surveyOption"
                      type="radio"
                      className="form-check-input"
                      value="Option2"
                      checked={votedOption === "Option2"}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor="Option2">{survey.Option2}</label>
                  </div>
                  {survey.Option3 ? (
                    <div className="surveyOption">
                      <input
                        name="surveyOption"
                        type="radio"
                        className="form-check-input"
                        value="Option3"
                        checked={votedOption === "Option3"}
                        onChange={handleOptionChange}
                      />
                      <label htmlFor="Option3">{survey.Option3}</label>
                    </div>
                  ) : null}
                  {survey.Option4 ? (
                    <div className="surveyOption">
                      <input
                        name="surveyOption"
                        type="radio"
                        className="form-check-input"
                        value="Option4"
                        checked={votedOption === "Option4"}
                        onChange={handleOptionChange}
                      />
                      <label htmlFor="Option4">{survey.Option4}</label>
                    </div>
                  ) : null}
                </div>
                <div className="submit-survey">
                  <button name="submit" type="submit" onClick={handleVote}>
                    Vote
                  </button>
                </div>
              </MyForm>
            )}
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
                    <Field
                      name="Visibility"
                      type="radio"
                      value="Public"
                      className="form-check-input"
                    />
                    <label htmlFor="Visibility">Public</label>
                  </div>
                  <div className="radio-group">
                    <Field
                      name="Visibility"
                      type="radio"
                      value="Private"
                      className="form-check-input"
                    />
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
