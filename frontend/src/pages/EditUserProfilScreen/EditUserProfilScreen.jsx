import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./EditUserProfilScreen.css";
import ImageWithJWT from "../../utils/ImageWithJWT";

import { hostname } from "../../HostnameConnect/Hostname";

function EditUserProfilScreen() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const userIdLoggedIn = localStorage.getItem("userId");
  console.info(userIdLoggedIn);
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${hostname}/users/${userIdLoggedIn}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error(
            "Erreur lors de la récupération des données de l'utilisateur",
            errorBody
          );
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur:",
          error
        );
      }
    };

    fetchUser();
  }, [userId]);
  console.info(user);
  const initialValues = {
    username: "",
    lastName: "",
    firstName: "",
    birthDate: "",
    address: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    gender: "",
    phone: "",
    biography: "",
    ProfileImage: null,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Pseudo requis"),
    lastName: Yup.string().required("Nom requis"),
    firstName: Yup.string().required("Prénom requis"),
    birthDate: Yup.date().required("Date de naissance requise"),
    address: Yup.string().required("Adresse requise"),
    email: Yup.string().email("Email invalide").required("Email requis"),
    gender: Yup.string().required("Genre requis"),
    phone: Yup.string().required("Téléphone requis"),
    biography: Yup.string().required("Biographie requise"),
    ProfileImage: Yup.mixed().required("Image requise"),
  });
  const calculateAge = (birthDate) => {
    const birthday = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      // eslint-disable-next-line no-plusplus
      age--;
    }
    return age;
  };

  const handleSubmit = async (values) => {
    const {
      username,
      lastName,
      firstName,
      birthDate,
      address,
      email,
      password,
      gender,
      // ProfileImage,
      biography,
      phone,
    } = values;

    const age = calculateAge(birthDate);

    const formData = {
      Username: username,
      LastName: lastName,
      FirstName: firstName,
      BirthDate: birthDate,
      Age: age.toString(),
      Address: address,
      Email: email,
      Password: password,
      Role: "User",
      Gender: gender,
      Phone: phone,
      Biography: biography,
    };
    console.info("dfqfv", formData);
    if (values.password !== values.passwordConfirmation) {
      // Affichez un message d'erreur ou effectuez une action appropriée
      console.error("Les mots de passe ne correspondent pas");
      return;
    }
    // if (ProfileImage && ProfileImage instanceof File) {
    //   formData.append("ProfileImage", ProfileImage);
    // }
    try {
      const response = await fetch(
        `http://localhost:5000/users/${userIdLoggedIn}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Check if the response is OK (status code 200-299)
      if (response.ok) {
        // Navigate to ConnexionScreen on successful response
        navigate("/ConnexionScreen");
      } else {
        // If the response status is not OK, handle errors
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          // Handle JSON response
          const data = await response.json();
          if (response.status === 409) {
            if (data.error.includes("nom d'utilisateur")) {
              setUsernameError(
                "Ce pseudo est déjà utilisé. Veuillez choisir un autre pseudo."
              );
            }
            if (data.error.includes("email")) {
              setEmailError(
                "Cet email est déjà utilisé. Veuillez choisir un autre email."
              );
            }
          } else {
            console.error(
              "Une erreur est survenue lors de l'inscription:",
              data.error
            );
          }
        } else {
          // Handle non-JSON response
          const text = await response.text();
          console.error("Non-JSON response from the server:", text);
        }
      }
    } catch (error) {
      // Handle network error or request failure
      console.error("Erreur lors de la requête:", error);
    }
  };
  if (!user) {
    return <div>Chargement...</div>;
  }
  const imageUrl = `${hostname}/upload/${user.ProfileImage}`;
  return (
    <div className="inscription-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <h2>Modifier votre Profil</h2>
            <div className="form-group">
              <label htmlFor="username">Pseudo</label>
              <Field name="username" type="text" placeholder={user.Username} />
              <ErrorMessage name="username" component="div" className="error" />
              {usernameError && (
                <div className="error-message">{usernameError}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <Field name="lastName" type="text" placeholder={user.LastName} />
              <ErrorMessage name="lastName" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <Field
                name="firstName"
                type="text"
                placeholder={user.FirstName}
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate">Date de Naissance</label>
              <Field
                name="birthDate"
                type="date"
                placeholder={
                  user.BirthDate
                    ? new Date(user.BirthDate).toISOString().split("T")[0]
                    : ""
                }
              />
              <ErrorMessage
                name="birthDate"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <Field name="address" type="text" placeholder={user.Address} />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <Field name="email" type="email" placeholder={user.Email} />
              <ErrorMessage name="email" component="div" className="error" />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <Field name="phone" type="text" placeholder={user.Phone} />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Genre</label>
              <Field name="gender" as="select" placeholder={user.Gender}>
                <option value="">Sélectionnez un genre</option>
                <option value="Male">Homme</option>
                <option value="Female">Femme</option>
                <option value="Other">Autre</option>
              </Field>

              <ErrorMessage name="gender" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="ProfileImage">Image de Profil</label>
              <input
                id="ProfileImage"
                name="ProfileImage"
                type="file"
                placeholder={user.ProfilImage}
                onChange={(event) =>
                  setFieldValue("ProfileImage", event.currentTarget.files[0])
                }
                required
              />
            </div>
            <div className="profile-image-container">
              <ImageWithJWT
                imageUrl={imageUrl}
                token={localStorage.getItem("userToken")}
                alt="Image de Profil"
              />
            </div>
            <div className="form-group">
              <label htmlFor="biography">Biographie</label>
              <Field
                name="biography"
                as="textarea"
                placeholder={user.Biography}
              />
              <ErrorMessage
                name="biography"
                component="div"
                className="error"
              />
            </div>
            <button type="submit">Modifier</button>
          </Form>
        )}
      </Formik>
      <div className="mdp">
        Changer le mot de passe
        <button type="button">
          <NavLink to="/changepassword">Changer</NavLink>
        </button>
      </div>
    </div>
  );
}

export default EditUserProfilScreen;
