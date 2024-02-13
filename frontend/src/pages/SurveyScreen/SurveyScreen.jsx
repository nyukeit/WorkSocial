import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import UserBar from "../../components/UserBar/UserBar";
import SurveyCard from "../../components/Surveys/SurveyCard";
import "./SurveyScreen.css";
import { useSurvey } from "../../contexts/SurveyContext";
import { hostname } from "../../HostnameConnect/Hostname";

export default function SurveyScreen() {
  const {
    surveys,
    getSurveys,
    votes,
    getVotes,
    likes,
    getLikes,
    comments,
    getComments,
  } = useSurvey();

  useEffect(() => {
    getSurveys();
    getVotes();
    getComments();
    getLikes();
  }, []);

  const token = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userId");

  surveys.sort((a, b) => (b.Updated_At > a.Updated_At ? 1 : -1));

  const initialValues = {
    Title: "",
    Content: "",
    Image: null,
    Visibility: "Public",
    Option1: "",
    Option2: "",
    Option3: "",
    Option4: "",
    UserID: userID,
  };

  const handleCreateSurvey = async (values) => {
    const {
      Image,
      Title,
      Content,
      Visibility,
      Option1,
      Option2,
      Option3,
      Option4,
    } = values;
    console.info(values);
    try {
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Content", Content);
      formData.append("Visibility", Visibility);
      formData.append("Option1", Option1);
      formData.append("Option2", Option2);
      formData.append("Option3", Option3);
      formData.append("Option4", Option4);
      formData.append("UserID", userID);
      if (Image && Image instanceof File) {
        formData.append("Image", Image);
      }
      const response = await fetch(`${hostname}/surveys`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.info("Survey Created");
        getSurveys();
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  return (
    <div className="container">
      <UserBar />
      <div className="content-area">
        {surveys.map((survey) => {
          const surveyVotes = votes.filter(
            (vote) => vote.Survey_ID === survey.Survey_ID
          );
          const surveyLikes = likes.filter(
            (like) => like.Survey_ID === survey.Survey_ID
          );
          const surveyComments = comments.filter(
            (comment) => comment.Survey_ID === survey.Survey_ID
          );
          return (
            <SurveyCard
              key={survey.Survey_ID}
              survey={survey}
              surveyVotes={surveyVotes}
              surveyLikes={surveyLikes}
              surveyComments={surveyComments}
            />
          );
        })}
      </div>
      <div className="sidebar">
        <div className="sidebar-item">
          <h3>Create Survey</h3>
          <Formik initialValues={initialValues} onSubmit={handleCreateSurvey}>
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
                  <Field
                    name="Visibility"
                    type="radio"
                    value="Public"
                    className="form-check-input"
                  />
                  <label htmlFor="Visibility">Public</label>

                  <Field
                    name="Visibility"
                    type="radio"
                    value="Private"
                    className="form-check-input"
                  />
                  <label htmlFor="Visibility">Private</label>
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
                <Button type="submit">Create</Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
