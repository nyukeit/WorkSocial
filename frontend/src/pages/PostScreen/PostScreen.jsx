import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import PostList from "../../components/Posts/PostList/PostList";
import "./PostScreen.css";
import { usePost } from "../../contexts/PostContext";
import { hostname } from "../../HostnameConnect/Hostname";

export default function PostScreen() {
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userId");

  const posts = usePost();

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
      await fetch(`${hostname}/posts`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          posts.getPosts();
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
      <button className="close-modal" onClick={handleCloseModal} type="button">
        <i className="fa-solid fa-xmark" />
      </button>
      <Formik initialValues={initialValues} onSubmit={handleCreatePost}>
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
    posts.getPosts();
  }, []);

  return (
    <div className="posts-container">
      <div className="button">
        <button id="createPost-btn" type="button" onClick={handleOpenModal}>
          Create Post
        </button>
      </div>
      <div className="posts">
        <PostList posts={posts.posts} />
      </div>
      {renderModal}
    </div>
  );
}
