import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { authHeader, token, userID } from "../../utils/auth";
import PostList from "../../components/Posts/PostList/PostList";
import "./PostScreen.css";

export default function PostScreen() {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userId");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getPosts = async () => {
    try {
      await fetch(`${url}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json().then((data) => setPosts(data)));
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const initialValues = {
    Title: "",
    Content: "",
    Image: null,
    Visibility: "Public",
    UserID: userID,
  };

  const handleCreatePost = async (values) => {
    const { Title, Content, Image, Visibility } = values;
    console.info(values);
    try {
      const formData = new FormData();
      formData.append("Title", Title);
      formData.append("Content", Content);
      formData.append("Visibility", Visibility);
      formData.append("UserID", userID);
      if (Image && Image instanceof File) {
        formData.append("Image", Image);
      }
      await fetch(`${url}/posts`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          getPosts();
        } else {
          console.error("Erreur lors de la requête:", res.statusText);
        }
      });
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const renderModal = showModal && (
    <div className="createPostmodal">
      <Formik initialValues={initialValues} onSubmit={handleCreatePost}>
        {({ setFieldValue }) => (
          <Form>
            <h4>Create Poste</h4>
            <div className="title-content">
              {/* <label htmlFor="Title">Title</label> */}
              <Field name="Title" placeholder="Title" type="text" />
              <ErrorMessage name="Title" component="div" className="error" />

              {/* <label htmlFor="Content">Content</label> */}
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
            <button
              id="createPost-btn"
              type="submit"
              onClick={handleCreatePost}
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts-container">
      <div className="button">
        <button id="createPost-btn" type="button" onClick={handleOpenModal}>
          Create Post
        </button>
      </div>
      <div className="posts">
        <PostList posts={posts} />
      </div>
      {renderModal}
    </div>
  );
}
