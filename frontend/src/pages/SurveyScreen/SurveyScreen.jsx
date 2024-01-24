import React, { useState, useEffect } from "react";
import { Formik, Form, Field /* useField, useFormikContext */ } from "formik";

import SurveyList from "../../components/Surveys/SurveyList/SurveyList";
import "./SurveyScreen.css";
import { useSurvey } from "../../contexts/SurveyContext";
import { hostname } from "../../HostnameConnect/Hostname";

// // eslint-disable-next-line react/function-component-definition
// const MyField = (props) => {
//   const {
//     values: { Option1, Option2, Option3, Option4 },
//     touched,
//     setFieldValue,
//   } = useFormikContext();
//   const [field, meta] = useField(props);

//   React.useEffect(() => {
//     if (
//       Option1.trim() !== "" &&
//       Option2.trim() !== "" &&
//       Option3.trim() !== "" &&
//       Option4.trim() !== "" &&
//       touched.Option1 &&
//       touched.Option2 &&
//       touched.Option3 &&
//       touched.Option4
//     ) {
//       setFieldValue(
//         // eslint-disable-next-line react/destructuring-assignment
//         props.name,
//         `${Option1}, ${Option2}, ${Option3}, ${Option4}`
//       );
//     }
//     // eslint-disable-next-line react/destructuring-assignment
//   }, [Option1, Option2, Option3, Option4, setFieldValue, props.name]);

//   return (
//     <>
//       {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//       <input {...props} {...field} />
//       {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
//     </>
//   );
// };

export default function SurveyScreen() {
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userId");

  const surveys = useSurvey();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        surveys.getSurveys();
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const renderModal = showModal && (
    <div className="createSurveymodal">
      <button className="close-modal" onClick={handleCloseModal} type="button">
        <i className="fa-solid fa-xmark" />
      </button>
      <Formik initialValues={initialValues} onSubmit={handleCreateSurvey}>
        {({ setFieldValue }) => (
          <Form>
            <h4>Create Survey</h4>
            <div className="title-content">
              <Field name="Title" placeholder="Title" type="text" />

              <Field name="Content" type="text" placeholder="Write Survey" />
            </div>
            <div className="visibility-group">
              <label htmlFor="Visibility">Public</label>
              <Field name="Visibility" type="radio" value="Public" />

              <label htmlFor="Visibility">Private</label>
              <Field name="Visibility" type="radio" value="Private" />
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
            <button
              id="createSurvey-btn"
              type="submit"
              // onClick={handleCreateSurvey}
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  useEffect(() => {
    surveys.getSurveys();
  }, []);

  return (
    <div className="surveys-container">
      <div className="button">
        <button id="createSurvey-btn" type="button" onClick={handleOpenModal}>
          Create Survey
        </button>
      </div>
      <div className="surveys">
        <SurveyList surveys={surveys.surveys} />
      </div>
      {renderModal}
    </div>
  );
}
