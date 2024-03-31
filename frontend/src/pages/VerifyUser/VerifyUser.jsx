import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field } from "formik";

export default function VerifyUser() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    const Email = values;
    const response = await fetch(
      `${import.meta.VITE_BACKEND_URL}/verify-user`,
      {
        method: "POST",
        body: JSON.stringify(Email),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setEmailSubmitted(true);
    }
  };

  return (
    <div className="container">
      <div>
        <h2 className="page-title">Mot de Passe Oublie?</h2>
        {emailSubmitted ? (
          <div className="alert alert-success" role="alert">
            Si l'email existe dans notre base de donnée, vous venez de recevoir
            un email avec un lien pour reinitialiser votre mot de passe.
          </div>
        ) : (
          <Formik initialValues={{ Email: "" }} onSubmit={handleSubmit}>
            <Form>
              <label htmlFor="Email">Email</label>
              <Field type="email" name="Email" />
              <Button type="submit">Envoyer</Button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}
