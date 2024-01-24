import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import "./SurveyCard.css";
import ImageWithJWT from "../../../utils/ImageWithJWT";
import { hostname } from "../../../HostnameConnect/Hostname";
import { useUser } from "../../../contexts/UserContext";
import { useSurvey } from "../../../contexts/SurveyContext";

export default function SurveyCard({ survey }) {
  const { getSurveys } = useSurvey();
  const { users, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const currentUser = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  if (loading) return <div>Loading...</div>; // Wait for users to load

  const surveyCreator = users.find((user) => user.User_ID === survey.User_ID);

  const imageUrl = [
    `${hostname}/upload/${survey.Image}`,
    `${hostname}/upload/${surveyCreator.ProfileImage}`,
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
        <div className="survey-menu">
          <button
            className="surveyMenuBtn"
            type="button"
            onClick={handleOpenModal}
          >
            Edit
          </button>
          <button
            className="surveyMenuBtn"
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

  const renderModal = showModal && (
    <div className="editSurveymodal">
      <button className="close-modal" onClick={handleCloseModal} type="button">
        <i className="fa-solid fa-xmark" />
      </button>
      <Formik
        initialValues={initialValues}
        onSubmit={handleEditSurvey}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form>
            <h4>Edit Survey</h4>
            <div className="title-content">
              <Field name="Title" placeholder="Title" type="text" />
              <Field name="Content" type="text" placeholder="Write Survey" />
            </div>
            <div className="visibility-group">
              <div className="radio-group">
                <label htmlFor="Visibility">Public</label>
                <Field name="Visibility" type="radio" value="Public" />
              </div>
              <div className="radio-group">
                <label htmlFor="Visibility">Private</label>
                <Field name="Visibility" type="radio" value="Private" />
              </div>
            </div>
            <div className="options-group">
              <label htmlFor="Option1">Option 1</label>
              <Field name="Option1" type="text" />
              {/* <MyField name="Option1" type="radio" /> */}

              <label htmlFor="Option2">Option 2</label>
              <Field name="Option2" type="text" />
              {/* <MyField name="Option2" type="radio" /> */}

              <label htmlFor="Option3">Option 3</label>
              <Field name="Option3" type="text" />
              {/* <MyField name="Option3" type="radio" /> */}

              <label htmlFor="Options4">Option 4</label>
              <Field name="Option4" type="text" />
              {/* <MyField name="Option4" type="radio" /> */}
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
            <button id="editSurvey-btn" type="submit">
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

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

  const renderDeleteModal = showDelModal && (
    <div className="deleteSurveymodal">
      <button
        className="close-modal"
        onClick={handleCloseDelModal}
        type="button"
      >
        <i className="fa-solid fa-xmark" />
      </button>
      <div className="delSurveyAlert">
        <h3>Are you sure you want to delete this survey?</h3>
        <button
          id="deleteSurvey-btn"
          type="button"
          onClick={handleDeleteSurvey}
        >
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
            <span className="username">{surveyCreator.Username}</span>
          </div>
          {parseInt(currentUser, 10) === parseInt(surveyCreator.User_ID, 10) ? (
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
          <ImageWithJWT className="survey-img" imageUrl={imageUrl[0]} />
        </div>
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
