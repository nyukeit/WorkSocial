// // import React from "react";
// // import { Formik, Form, Field, ErrorMessage } from "formik";
// // import { useNavigate } from "react-router-dom";
// // import { hostname } from "../../HostnameConnect/Hostname";

// // const hashNewPassword = async (newPassword) => {
// //   try {
// //     const response = await fetch(`${hostname}/users/hashPassword`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// //       },
// //       body: JSON.stringify({
// //         newPassword,
// //       }),
// //     });

// //     if (response.ok) {
// //       const hashedPasswordData = await response.json();
// //       return hashedPasswordData.hashedPassword;
// //     }
// //     // Gérez les erreurs lors du hachage du nouveau mot de passe
// //     const errorData = await response.json();
// //     alert(
// //       `Erreur lors du hachage du nouveau mot de passe : ${errorData.message}`
// //     );
// //     return null;
// //   } catch (error) {
// //     console.error("Erreur lors du hachage du nouveau mot de passe:", error);
// //     return null;
// //   }
// // };
// // function ChangePasswordScreen() {
// //   const navigate = useNavigate();

// //   const initialValues = {
// //     oldPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   };
// //   const token = localStorage.getItem("userToken");
// //   const handleSubmit = async (values) => {
// //     if (values.newPassword !== values.confirmPassword) {
// //       alert("Les mots de passe ne correspondent pas");
// //       return;
// //     }

// //     const passwordData = {
// //       oldPassword: values.oldPassword,
// //       newPassword: values.newPassword,
// //     };

// //     try {
// //       // Vérifiez d'abord l'ancien mot de passe
// //       const response = await fetch(`${hostname}/users/checkOldPassword`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// //         },
// //         body: JSON.stringify(passwordData),
// //       });

// //       if (response.ok) {
// //         // Maintenant que l'ancien mot de passe est vérifié, hachez le nouveau mot de passe
// //         const hashedPassword = await hashNewPassword(values.newPassword);

// //         // Mettez à jour le nouveau mot de passe
// //         const updateResponse = await fetch(`${hostname}/users/updatePassword`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
// //           },
// //           body: JSON.stringify({
// //             userId: localStorage.getItem("userId"),
// //             hashedPassword,
// //           }),
// //         });

// //         if (updateResponse.ok) {
// //           alert("Mot de passe mis à jour avec succès");
// //           navigate("/MyProfileScreen");
// //         } else {
// //           // Gérez les erreurs lors de la mise à jour du mot de passe
// //           const errorData = await updateResponse.json();
// //           alert(
// //             `Erreur lors de la mise à jour du mot de passe : ${errorData.message}`
// //           );
// //         }
// //       } else {
// //         // Gérez les erreurs lors de la vérification de l'ancien mot de passe
// //         const contentType = response.headers.get("content-type");
// //         if (contentType && contentType.includes("application/json")) {
// //           const errorData = await response.json();
// //           alert(
// //             `Erreur lors du changement de mot de passe : ${errorData.message}`
// //           );
// //         } else {
// //           const text = await response.text();
// //           alert(`Erreur lors du changement de mot de passe : ${text}`);
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Erreur lors de la requête:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Changer le Mot de Passe</h2>
// //       <Formik initialValues={initialValues} onSubmit={handleSubmit}>
// //         {() => (
// //           <Form>
// //             <div className="form-group">
// //               <label htmlFor="oldPassword">Ancien Mot de Passe</label>
// //               <Field name="oldPassword" type="password" />
// //               <ErrorMessage
// //                 name="oldPassword"
// //                 component="div"
// //                 className="error"
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label htmlFor="newPassword">Nouveau Mot de Passe</label>
// //               <Field name="newPassword" type="password" />
// //               <ErrorMessage
// //                 name="newPassword"
// //                 component="div"
// //                 className="error"
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label htmlFor="confirmPassword">
// //                 Confirmer le Nouveau Mot de Passe
// //               </label>
// //               <Field name="confirmPassword" type="password" />
// //               <ErrorMessage
// //                 name="confirmPassword"
// //                 component="div"
// //                 className="error"
// //               />
// //             </div>

// //             <button type="submit">Changer le Mot de Passe</button>
// //           </Form>
// //         )}
// //       </Formik>
// //     </div>
// //   );
// // }

// // export default ChangePasswordScreen;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// // import * as Yup from "yup";
// import "./PasswordEditScreen.css";

// import { hostname } from "../../HostnameConnect/Hostname";

// function ChangePassword() {
//   const [user, setUser] = useState(null);
//   const { userId } = useParams();
//   const userIdLoggedIn = localStorage.getItem("userId");
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`${hostname}/users/${userIdLoggedIn}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           const errorBody = await response.text();
//           console.error(
//             "Erreur lors de la récupération des données de l'utilisateur",
//             errorBody
//           );
//           return;
//         }

//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error(
//           "Erreur lors de la récupération des données de l'utilisateur:",
//           error
//         );
//       }
//     };
//     fetchUser();
//   }, [userId]);
//   const initialValues = {
//     oldPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//     username: "",
//     lastName: "",
//     firstName: "",
//     birthDate: "",
//     address: "",
//     email: "",
//     password: "",
//     gender: "",
//     phone: "",
//     biography: "",
//     ProfileImage: null,
//   };

//   // const validationSchema = Yup.object().shape({
//   //   username: Yup.string().required("Pseudo requis"),
//   //   lastName: Yup.string().required("Nom requis"),
//   //   firstName: Yup.string().required("Prénom requis"),
//   //   birthDate: Yup.date().required("Date de naissance requise"),
//   //   address: Yup.string().required("Adresse requise"),
//   //   email: Yup.string().email("Email invalide").required("Email requis"),
//   //   password: Yup.string()
//   //     .min(6, "Le mot de passe doit avoir au moins 6 caractères")
//   //     .required("Mot de passe requis"),
//   //   passwordConfirmation: Yup.string()
//   //     .oneOf(
//   //       [Yup.ref("password"), null],
//   //       "Les mots de passe doivent correspondre"
//   //     )
//   //     .required("La confirmation du mot de passe est requise"),
//   //   gender: Yup.string().required("Genre requis"),
//   //   phone: Yup.string().required("Téléphone requis"),
//   //   biography: Yup.string().required("Biographie requise"),
//   //   ProfileImage: Yup.mixed().required("Image requise"),
//   // });
//   // const calculateAge = (birthDate) => {
//   //   const birthday = new Date(birthDate);
//   //   const today = new Date();
//   //   let age = today.getFullYear() - birthday.getFullYear();
//   //   const m = today.getMonth() - birthday.getMonth();
//   //   if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
//   //     // eslint-disable-next-line no-plusplus
//   //     age--;
//   //   }
//   //   return age;
//   // };

//   const handleSubmit = async (values) => {
//     const {
//       username,
//       lastName,
//       firstName,
//       birthDate,
//       address,
//       email,
//       password,
//       gender,
//       ProfileImage,
//       biography,
//       phone,
//       oldPassword,
//       newPassword,
//       passwordConfirmation,
//     } = values;

//     // const age = calculateAge(user.BirthDate);
//     // const birthdate = user.BirthDate.toISOString().split("T")[0];
//     // console.info(birthdate);

//     const formData = {
//       Username: user.Username,
//       LastName: user.LastName,
//       FirstName: user.FirstName,
//       BirthDate: user.Birthdate,
//       Age: "",
//       Address: user.Address,
//       Email: user.Email,
//       Password: newPassword,
//       Role: "User",
//       Gender: user.Gender,
//       Phone: user.Phone,
//       Biography: user.Biography,
//     };
//     console.info(formData);
//     try {
//       const verifyPasswordResponse = await fetch(
//         `http://localhost:5000/users/checkOldPassword`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             Password: oldPassword,
//             Email: user.Email,
//           }),
//         }
//       );

//       if (!verifyPasswordResponse.ok) {
//         // Afficher un message d'erreur approprié ou effectuer une action
//         console.error("Ancien mot de passe incorrect");
//         return;
//       }
//     } catch (error) {
//       console.error("Erreur lors de la vérification du mot de passe:", error);
//       return;
//     }

//     // Si l'ancien mot de passe est correct, mettre à jour le mot de passe
//     try {
//       const updatePasswordResponse = await fetch(
//         `http://localhost:5000/updatePassword/${userIdLoggedIn}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             Password: newPassword,
//           }),
//         }
//       );

//       if (updatePasswordResponse.ok) {
//         // Rediriger vers ConnexionScreen en cas de succès
//         navigate("/ConnexionScreen");
//       } else {
//         // Gérer les erreurs de la mise à jour du mot de passe
//         const contentType = updatePasswordResponse.headers.get("content-type");
//         if (contentType && contentType.indexOf("application/json") !== -1) {
//           const data = await updatePasswordResponse.json();
//           if (updatePasswordResponse.status === 409) {
//             if (data.error.includes("nom d'utilisateur")) {
//               setUsernameError(
//                 "Ce pseudo est déjà utilisé. Veuillez choisir un autre pseudo."
//               );
//             }
//             if (data.error.includes("email")) {
//               setEmailError(
//                 "Cet email est déjà utilisé. Veuillez choisir un autre email."
//               );
//             }
//           } else {
//             console.error(
//               "Une erreur est survenue lors de la mise à jour du mot de passe:",
//               data.error
//             );
//           }
//         } else {
//           const text = await updatePasswordResponse.text();
//           console.error(
//             "Réponse non-JSON du serveur lors de la mise à jour du mot de passe:",
//             text
//           );
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Erreur lors de la requête de mise à jour du mot de passe:",
//         error
//       );
//     }
//   };
//   if (!user) {
//     return <div>Chargement...</div>;
//   }
//   return (
//     <div className="inscription-screen">
//       <Formik
//         initialValues={initialValues}
//         // validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form>
//           <h2>Changer votre mot de passe</h2>
//           <div className="form-group">
//             <label htmlFor="oldPassword">Mot de Passe Actuel</label>
//             <Field name="oldPassword" type="password" />
//             <ErrorMessage
//               name="oldPassword"
//               component="div"
//               className="error"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="newPassword">Nouveau Mot de Passe</label>
//             <Field name="newPassword" type="password" />
//             <ErrorMessage
//               name="newPassword"
//               component="div"
//               className="error"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmNewPassword">
//               Confirmer le Nouveau Mot de Passe
//             </label>
//             <Field name="confirmNewPassword" type="password" />
//             <ErrorMessage
//               name="confirmNewPassword"
//               component="div"
//               className="error"
//             />
//           </div>
//           <button type="submit">Changer le Mot de Passe</button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default ChangePassword;
