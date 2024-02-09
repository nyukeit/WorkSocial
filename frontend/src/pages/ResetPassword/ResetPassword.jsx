import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { hostname } from "../../HostnameConnect/Hostname";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { key } = useParams();
  const userLoggedIn = localStorage.getItem("userId");

  useEffect(() => {
    if (userLoggedIn) {
      navigate(`/profile/${userLoggedIn}`);
    }
  }, []);

  const handlePasswordSubmit = async (values) => {
    const { Password } = values;
    const response = await fetch(`${hostname}/reset-password`, {
      method: "POST",
      body: JSON.stringify({ Password, key }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate("/connexion");
    }
  };

  const validationSchema = Yup.object().shape({
    Password: Yup.string()
      .required("Le mot de passe est requis")
      .min(6, "Le mot de passe doit avoir au moins 6 caractères"),
    RepeatPassword: Yup.string()
      .oneOf(
        [Yup.ref("Password"), null],
        "Les mots de passe ne sont pas identiques"
      )
      .required("Le confirmation du mot de passe est requis"),
  });

  return (
    <div className="container">
      <div>
        {!key ? (
          <p>
            Vous êtes sur la page de réinitialisation du mot de passe{" "}
            <strong>sans clé valide</strong>. Si vous avez oublié votre mot de
            passe, veuillez en demander un nouveau{" "}
            <a href="/verify-user">ici</a>.
          </p>
        ) : (
          <Formik
            initialValues={{ Password: "" }}
            validationSchema={validationSchema}
            onSubmit={handlePasswordSubmit}
          >
            <Form>
              <label htmlFor="Password">Nouveau Password</label>
              <Field type="password" name="Password" />
              <label htmlFor="RepeatPassword">Confirmer Nouveau Password</label>
              <Field type="password" name="RepeatPassword" />
              <Button type="submit">Envoyer</Button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}
