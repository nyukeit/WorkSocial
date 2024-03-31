// Companies Screen
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import { Button, Modal } from "react-bootstrap";
import CompanyCard from "../../components/Companies/CompanyCard";
import UserBar from "../../components/UserBar/UserBar";

import { useCompany } from "../../contexts/CompanyContext";

export default function CompaniesScreen() {
  const [showModal, setShowModal] = useState(false);
  const { companies, getCompanies } = useCompany();

  useEffect(() => {
    getCompanies(); // Appel de la fonction pour obtenir les entreprises lors du chargement
  }, []);

  const token = localStorage.getItem("userToken");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const initialValues = {
    Logo: null,
    Name: "",
    URL: "",
    Phone: "",
    Email: "",
    Activity: "",
    Address: "",
  };

  const handleCreateCompany = async (values) => {
    const { Logo, Name, URL, Phone, Email, Activity, Address } = values;
    try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("URL", URL);
      formData.append("Logo", Logo);
      formData.append("Phone", Phone);
      formData.append("Email", Email);
      formData.append("Activity", Activity);
      formData.append("Address", Address);

      await fetch(`${import.meta.env.VITE_BACKEND_URL}/company`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          console.info(res);
          getCompanies(); // Rafraîchi la liste des entreprises après création
        } else {
          console.error("Erreur lors de la requête :", res.statusText);
        }
      });

      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="container">
      <UserBar />
      <div>
        <Button className="create-btn" onClick={handleOpenModal}>
          <i className="fas fa-plus" /> Create Company
        </Button>
        {/* Affichage des entreprises */}
        {companies.map((company) => (
          <div key={company.Company_ID}>
            <CompanyCard company={company} />
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} className="modals">
        <Modal.Header closeButton>Create Company</Modal.Header>
        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={handleCreateCompany}>
            {({ setFieldValue }) => (
              <Form>
                <div className="title-content">
                  <label htmlFor="Name">Company Name</label>
                  <Field
                    name="Name"
                    placeholder="Company Name"
                    type="text"
                    className="form-control"
                  />

                  <label htmlFor="URL">Website URL</label>
                  <Field
                    name="URL"
                    placeholder="Website URL"
                    type="text"
                    className="form-control"
                  />

                  <label htmlFor="Logo">Company Logo</label>
                  <input
                    name="Logo"
                    type="file"
                    onChange={(e) =>
                      setFieldValue("Logo", e.currentTarget.files[0])
                    }
                  />

                  <label htmlFor="Phone">Phone</label>
                  <Field
                    name="Phone"
                    placeholder="Phone"
                    type="text"
                    className="form-control"
                  />

                  <label htmlFor="Email">Email</label>
                  <Field
                    name="Email"
                    placeholder="Email"
                    type="email"
                    className="form-control"
                  />

                  <label htmlFor="Activity">Activity</label>
                  <Field
                    name="Activity"
                    placeholder="Activity"
                    type="text"
                    className="form-control"
                  />

                  <label htmlFor="Address">Address</label>
                  <Field
                    name="Address"
                    placeholder="Address"
                    type="text"
                    className="form-control"
                  />
                </div>
                <Button id="createCompany-btn" type="submit">
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
}
