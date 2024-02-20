// Import Modules
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";

// Import Styles
import "./EventCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import { Form as MyForm } from "react-bootstrap";

// Import Utils
import ImageWithJWT from "../../utils/ImageWithJWT";
import { hostname } from "../../HostnameConnect/Hostname";

// Import Contexts
import { useUser } from "../../contexts/UserContext";
import { useEvent } from "../../contexts/EventContext";

export default function EventCard({
  event,
  eventComments,
  eventLikes,
  // eventInvites,
  // daysRemaining,
}) {
  // Contexts
  const { users, loading } = useUser();
  const { getEvents, getComments, getLikes } = useEvent();

  // States
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [comment, setComment] = useState("");
  // const [selectedUsers, setSelectedUsers] = useState([]);

  // Local Storage Variables
  const currentUserID = parseInt(localStorage.getItem("userId"), 10);
  const token = localStorage.getItem("userToken");

  // Mapping Creators
  const eventCreator = users.find((user) => user.User_ID === event.User_ID);

  if (eventCreator && eventCreator.User_ID === currentUserID) {
    eventCreator.FirstName = "You";
  }

  // Formatage de la date
  const options = {
    day: "numeric",
    month: "short",
    weekday: "short",
    year: "numeric",
  };
  const formattedStartDate = new Date(event.StartDate)
    .toLocaleDateString("fr-FR", options)
    .toUpperCase();

  const formattedStartTime = new Date(event.StartDate).toLocaleTimeString(
    "fr-FR",
    {
      timeZone: "CET",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const commentUserPairs = eventComments.map((cmt) => {
    const commentCreator = users.find(
      (user) => parseInt(user.User_ID, 10) === parseInt(cmt.User_ID, 10)
    );
    return {
      commnt: cmt,
      user: commentCreator,
    };
  });
  // Check if user has liked
  const userHasLiked = eventLikes.some(
    (pl) => parseInt(pl.User_ID, 10) === currentUserID
  );
  useEffect(() => {
    getLikes();
    getComments();
  }, []);

  if (!eventCreator) {
    return <div>Loading...</div>;
  }

  const imageUrl = [
    `${hostname}/upload/${event.Image}`,
    `${hostname}/upload/${eventCreator.ProfileImage}`,
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle Modals
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenDelModal = () => setShowDelModal(true);
  const handleCloseDelModal = () => setShowDelModal(false);
  const handleOpenCommentModal = () => setShowCommentModal(true);
  const handleCloseCommentModal = () => setShowCommentModal(false);
  const handleOpenInviteModal = () => setShowInviteModal(true);
  const handleCloseInviteModal = () => setShowInviteModal(false);

  // Handle Event Edit
  const initialValues = {
    Image: `${event.Image}`,
    EventName: `${event.EventName}`,
    StartDate: `${event.StartDate}`,
    EndDate: `${event.EndDate}`,
    StartTime: `${event.StartTime}`,
    EndTime: `${event.EndTime}`,
    Description: `${event.Description}`,
    Visibility: `${event.Visibility}`,
    UserID: event.User_ID,
  };

  const handleEditEvent = async (values) => {
    const {
      Image,
      EventName,
      StartDate,
      EndDate,
      StartTime,
      EndTime,
      Description,
      Visibility,
    } = values;
    try {
      const formData = new FormData();
      formData.append("EventName", EventName);
      formData.append("StartDate", StartDate);
      formData.append("EndDate", EndDate);
      formData.append("StartTime", StartTime);
      formData.append("EndTime", EndTime);
      formData.append("Description", Description);
      formData.append("Visibility", Visibility);
      formData.append("UserID", event.User_ID);
      if (Image && Image instanceof File) {
        formData.append("Image", Image);
      }

      const response = await fetch(`${hostname}/events/${event.Event_ID}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.info("Event Edit !!");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
      handleCloseModal();
      getEvents();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  // Handle Delete
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`${hostname}/events/${event.Event_ID}`, {
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
      getEvents();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };
  // HandleComment
  const handleComment = (e) => setComment(e.target.value);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${hostname}/events/${event.Event_ID}/comments`,
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

  const handleInviteUser = async (values) => {
    const selectedUsers = values;
    console.info(selectedUsers);
    try {
      const response = await fetch(
        `${hostname}/events/${event.Event_ID}/invites`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUsers),
        }
      );
      if (response.ok) {
        console.info("Invites Sent");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  // Handle Post Like / Dislike
  const handleEventLikeDislike = async (action, userId) => {
    if (action === "like") {
      try {
        const response = await fetch(
          `${hostname}/events/${event.Event_ID}/likes`,
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
          `${hostname}/events/${event.Event_ID}/likes`,
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
          getLikes();
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <span>
            {formattedStartDate}, {formattedStartTime}
          </span>
          <div>
            {parseInt(currentUserID, 10) ===
            parseInt(eventCreator.User_ID, 10) ? (
              <DropdownButton id="context-menu-btn">
                <Dropdown.Item onClick={handleOpenModal}>Edit</Dropdown.Item>
                <Dropdown.Item onClick={handleOpenModal}>Manage</Dropdown.Item>
                <Dropdown.Item onClick={handleOpenDelModal}>
                  Delete
                </Dropdown.Item>
              </DropdownButton>
            ) : null}
          </div>
        </Card.Header>
        <Card.Body>
          <div className="card-img">
            <ImageWithJWT className="post-img" imageUrl={imageUrl[0]} />
          </div>
          {!userHasLiked ? (
            <button
              className="action-btn"
              name="like"
              type="button"
              onClick={() => handleEventLikeDislike("like", currentUserID)}
            >
              <i className="fa-regular fa-heart" />
              <span className="action-btn-text">{eventLikes.length}</span>
            </button>
          ) : (
            <>
              <button
                className="action-btn"
                name="unlike"
                type="button"
                onClick={() => handleEventLikeDislike("unlike", currentUserID)}
              >
                <i className="fa-solid fa-heart" />
              </button>
              <span className="action-btn-text">{eventLikes.length}</span>
            </>
          )}
          <button
            className="action-btn"
            type="button"
            onClick={handleOpenCommentModal}
          >
            <i className="fa-regular fa-comment" />
          </button>
          <Card.Title className="card-title">{event.EventName}</Card.Title>
          {eventCreator ? (
            <p>{eventCreator.FirstName}</p>
          ) : (
            <strong>Unknown</strong>
          )}
          <Card.Text>{event.Description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {/* eslint-disable-next-line no-nested-ternary */}
          {new Date().toLocaleDateString("fr-FR") >
          new Date(event.EndDate).toLocaleDateString("fr-FR") ? (
            <span id="event-ended-text">This event has ended</span>
          ) : eventCreator.User_ID === currentUserID ? (
            <Button onClick={handleOpenInviteModal}>Invite</Button>
          ) : (
            <Button>Attend</Button>
          )}
        </Card.Footer>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal} className="modals">
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleEditEvent}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form>
                <label htmlFor="EventName">Event Name</label>
                <Field
                  name="EventName"
                  placeholder="Event Name"
                  type="text"
                  className="form-control"
                />

                <label htmlFor="StartDate">Start Date</label>
                <Field
                  name="StartDate"
                  placeholder="Start Date"
                  type="date"
                  className="form-control"
                />

                <label htmlFor="EndDate">End Date</label>
                <Field
                  name="EndDate"
                  placeholder="End Date"
                  type="date"
                  className="form-control"
                />

                <label htmlFor="StartTime">Start Time</label>
                <Field
                  name="StartTime"
                  placeholder="Start Time"
                  type="time"
                  className="form-control"
                />

                <label htmlFor="EndTime">End Time</label>
                <Field
                  name="EndTime"
                  placeholder="End Time"
                  type="time"
                  className="form-control"
                />

                <label htmlFor="Description">Description</label>
                <Field
                  name="Description"
                  component="textarea"
                  rows="5"
                  placeholder="Description"
                  className="form-control"
                />

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

                <label htmlFor="Image">Image</label>
                <input
                  name="Image"
                  type="file"
                  onChange={(e) =>
                    setFieldValue("Image", e.currentTarget.files[0])
                  }
                />
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
          <Button variant="danger" onClick={handleDeleteEvent}>
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
          {commentUserPairs.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            commentUserPairs.map(({ commnt, user }) => (
              <div className="comment" key={commnt.Comment_ID}>
                {user && (
                  <div className="profileImgDiv-comments">
                    <ImageWithJWT
                      imageUrl={`${hostname}/upload/${user.ProfileImage}`}
                    />
                  </div>
                )}
                <div className="commentData">
                  <span className="username-comments">{user.Username}</span>
                  <p id="comment-content">{commnt.Comment}</p>
                </div>
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
      <Modal
        show={showInviteModal}
        onHide={handleCloseInviteModal}
        className="modals"
      >
        <Modal.Header closeButton>
          <Modal.Title>Invite Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              selectedUsers: [],
            }}
            onSubmit={handleInviteUser}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Field
                  name="selectedUsers"
                  as="select"
                  multiple
                  className="form-control custom-select"
                  onChange={(evt) => {
                    const selectedUserIds = Array.from(
                      evt.target.selectedOptions,
                      (option) => option.value
                    );
                    setFieldValue("selectedUsers", selectedUserIds);
                  }}
                >
                  {users.map((user) => (
                    <option key={user.User_ID} value={user.User_ID}>
                      {user.FirstName} {user.LastName}
                    </option>
                  ))}
                </Field>
                <div>
                  {values.selectedUsers.map((userId) => {
                    const user = users.find(
                      (u) => u.User_ID.toString() === userId
                    );
                    return (
                      <div key={userId}>
                        {user.FirstName} {user.LastName}
                      </div>
                    );
                  })}
                </div>
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    Event_ID: PropTypes.number.isRequired,
    EventName: PropTypes.string.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string,
    StartTime: PropTypes.string,
    EndTime: PropTypes.string,
    Description: PropTypes.string,
    Visibility: PropTypes.string.isRequired,
    Image: PropTypes.string,
    User_ID: PropTypes.number.isRequired,
  }).isRequired,
  eventLikes: PropTypes.arrayOf(
    PropTypes.shape({
      Event_ID: PropTypes.number.isRequired,
      User_ID: PropTypes.number.isRequired,
    })
  ),

  eventComments: PropTypes.arrayOf(
    PropTypes.shape({
      Event_ID: PropTypes.number.isRequired,
      User_ID: PropTypes.number.isRequired,
      Comment: PropTypes.string.isRequired,
    })
  ),
};

EventCard.defaultProps = {
  eventComments: [],
  eventLikes: [],
};
