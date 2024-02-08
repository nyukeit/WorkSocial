import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Formik, Form, Field } from "formik";
import { useParams, useNavigate } from "react-router-dom";
// import * as Yup from "yup";

import { hostname } from "../../HostnameConnect/Hostname";

export default function ResetPassword() {
  // const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const navigate = useNavigate();
  const { key } = useParams();
  console.info(key);
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
      // setPasswordSubmitted(true);
      navigate("/connexion");
    }
  };

  useEffect(() => {
    if (key) {
      console.info(key);
      handlePasswordSubmit();
    }
  }, [key]);

  return (
    <div className="container">
      <div>
        <Formik
          initialValues={{ Password: "" }}
          onSubmit={handlePasswordSubmit}
        >
          <Form>
            <label htmlFor="Password">Password</label>
            <Field type="password" name="Password" />
            {/* <label htmlFor="RepeatPassword">Repeat Password</label>
            <Field type="password" name="RepeatPassword" /> */}
            <Button type="submit">Envoyer</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
