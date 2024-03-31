// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field } from "formik";

// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import PostCard from "../../components/Posts/PostCard";
// import UserBar from "../../components/UserBar/UserBar";
// import { usePost } from "../../contexts/PostContext";

// export default function CompanyScreen() {
//
//   const [showModal, setShowModal] = useState(false);

//   const { posts, getPosts, comments, getComments, likes, getLikes } = usePost();

//   useEffect(() => {
//     getPosts();
//     getComments();
//     getLikes();
//   }, []);

//   const token = localStorage.getItem("userToken");
//   const userID = localStorage.getItem("userId");

//   posts.sort((a, b) => (b.Updated_At > a.Updated_At ? 1 : -1));

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const initialValues = {
//     Title: "",
//     Content: "",
//     Image: null,
//     Visibility: "Public",
//     UserID: userID,
//   };

//   const handleCreatePost = async (values) => {
//     const { Title, Content, Image, Visibility } = values;
//     try {
//       const formData = new FormData();
//       formData.append("Title", Title);
//       formData.append("Content", Content);
//       formData.append("Visibility", Visibility);
//       formData.append("UserID", userID);
//       if (Image && Image instanceof File) {
//         formData.append("Image", Image);
//       }
//       await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }).then((res) => {
//         if (res.ok) {
//           getPosts();
//         } else {
//           console.error("Erreur lors de la requête:", res.statusText);
//         }
//       });
//       handleCloseModal();
//     } catch (error) {
//       console.error("Erreur lors de la requête:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <UserBar />
//       <div>
//         <Button className="create-btn" type="button" onClick={handleOpenModal}>
//           <i className="fas fa-plus" /> Create Post
//         </Button>
//         {posts.map((post) => {
//           const postLikes = likes.filter(
//             (like) => like.Post_ID === post.Post_ID
//           );
//           const postComments = comments.filter(
//             (comment) => comment.Post_ID === post.Post_ID
//           );
//           return (
//             <PostCard
//               key={post.Post_ID}
//               post={post}
//               postLikes={postLikes}
//               postComments={postComments}
//             />
//           );
//         })}
//       </div>
//       <Modal show={showModal} onHide={handleCloseModal} className="modals">
//         <Modal.Header closeButton>Create Post</Modal.Header>
//         <Modal.Body>
//           <Formik initialValues={initialValues} onSubmit={handleCreateCompany}>
//             {({ setFieldValue }) => (
//               <Form>
//                 <div className="title-content">
//                   <Field
//                     name="CompanyName"
//                     placeholder="Company Name"
//                     type="text"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanySlogan"
//                     placeholder="Slogan"
//                     type="text"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyActivity"
//                     placeholder="Activity"
//                     type="text"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyAddress"
//                     placeholder="Address"
//                     type="text"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyUrl"
//                     placeholder="Website URL"
//                     type="text"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyMail"
//                     placeholder="Email"
//                     type="email"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyPhone"
//                     placeholder="Phone"
//                     type="tel"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyLogo"
//                     placeholder="Logo URL"
//                     type="text"
//                     className="form-control"
//                   />
//                   <Field
//                     name="CompanyDescription"
//                     placeholder="Description"
//                     component="textarea"
//                     rows="3"
//                     className="form-control"
//                   />
//                   <Field
//                     name="Effectif"
//                     placeholder="Effectif"
//                     type="text"
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="visibility-group">
//                   <div className="radio-group">
//                     <Field
//                       name="Visibility"
//                       type="radio"
//                       value="Public"
//                       className="form-check-input"
//                     />
//                     <label htmlFor="Visibility">Public</label>
//                   </div>
//                   <div className="radio-group">
//                     <Field
//                       name="Visibility"
//                       type="radio"
//                       value="Private"
//                       className="form-check-input"
//                     />
//                     <label htmlFor="Visibility">Private</label>
//                   </div>
//                 </div>
//                 <div className="img-upload">
//                   <label htmlFor="CompanyLogo">
//                     <i className="fa-solid fa-image" /> Attach Logo
//                   </label>
//                   <input
//                     id="CompanyLogo"
//                     name="CompanyLogo"
//                     type="file"
//                     onChange={(event) =>
//                       setFieldValue("CompanyLogo", event.currentTarget.files[0])
//                     }
//                   />
//                 </div>
//                 <button id="createCompany-btn" type="submit">
//                   Create Company
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }
