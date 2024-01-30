import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import Modal from "react-bootstrap/Modal";
import PostList from "../../components/Posts/PostList/PostList";
import "./PostScreen.css";
import { usePost } from "../../contexts/PostContext";
import { hostname } from "../../HostnameConnect/Hostname";

export default function PostScreen() {
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userId");

  const { posts, getPosts } = usePost();

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

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
      <Modal show={showModal} onHide={handleCloseModal} className="modals">
        <Modal.Header closeButton>Create Post</Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={handleCreatePost}>
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
        </Modal.Body>
      </Modal>
    </div>
  );
}
