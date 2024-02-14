// Company Card
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form as MyForm } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";

import ImageWithJWT from "../../utils/ImageWithJWT";
import { hostname } from "../../HostnameConnect/Hostname";

import { useUser } from "../../contexts/UserContext";
import { useCompany } from "../../contexts/CompanyContext";

export default function CompanyCard({ company }) {
  const { users, loading } = useUser();
  const { getCompanies } = useCompany();

  const [showModal, setShowModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  const token = localStorage.getItem("userToken");
  const currentUserID = parseInt(localStorage.getItem("userId"), 10);

  // const companyCreator = users.find((user) => user.User_ID === user.User_ID);

  useEffect(() => {
    // Load necessary data
  }, []);

  // if (!companyCreator || loading) {
  //   return <div>Loading...</div>;
  // }

  const imageUrl = `${hostname}/upload/${company.Logo}`;

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenDelModal = () => setShowDelModal(true);
  const handleCloseDelModal = () => setShowDelModal(false);

  const initialValues = {
    Logo: `${company.Logo}`,
    Name: `${company.Name}`,
    URL: `${company.URL}`,
    Phone: `${company.Phone}`,
    Email: `${company.Email}`,
    Activity: `${company.Activity}`,
    Address: `${company.Address}`,
  };

  const handleEditCompany = async (values) => {
    const { Logo, Name, URL, Phone, Email, Activity, Address } = values;
    try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("URL", URL);
      formData.append("Phone", Phone);
      formData.append("Email", Email);
      formData.append("Activity", Activity);
      formData.append("Address", Address);
      if (Logo && Logo instanceof File) {
        formData.append("Logo", Logo);
      }

      const response = await fetch(
        `${hostname}/company/${company.Company_ID}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        console.info("Event Edit !!");
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
      handleCloseModal();
      getCompanies();
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const handleDeleteCompany = async () => {
    // try {
    //   const response = await fetch(`${hostname}/events/${event.Event_ID}`, {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (response.ok) {
    //     // console.info("Post Deleted");
    //   } else {
    //     console.error("Erreur lors de la requête:", response.statusText);
    //   }
    //   handleCloseDelModal();
    //   getEvents();
    // } catch (error) {
    //   console.error("Erreur lors de la requête:", error);
    // }
  };

  return (
    <>
      <Card>
        <div className="card-header">
          <div className="profile">
            {/* <div className="profileImgDiv">
              <ImageWithJWT className="pcProfileImg" imageUrl={imageUrl} />
            </div>
            <span className="username">{companyCreator.Username}</span> */}
          </div>
          {/* {parseInt(currentUserID, 10) ===
          parseInt(companyCreator.User_ID, 10) ? (
            <DropdownButton id="context-menu-btn" title="">
              <Button onClick={handleOpenModal}>Edit</Button>
              <Button onClick={handleOpenDelModal}>Delete</Button>
            </DropdownButton>
          ) : null} */}
        </div>
        <Card.Body>
          <Card.Title>{company.Name}</Card.Title>
          <Card.Text>
            <strong>URL:</strong> {company.URL}
            <br />
            <strong>Phone:</strong> {company.Phone}
            <br />
            <strong>Email:</strong> {company.Email}
            <br />
            <strong>Activity:</strong> {company.Activity}
            <br />
            <strong>Address:</strong> {company.Address}
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal} className="modals">
        <Modal.Header closeButton>
          <Modal.Title>Edit Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleEditCompany}
            enableReinitialize
          >
            {({ setFieldValue }) => (
              <Form>
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

                <label htmlFor="Logo">Company Logo</label>
                <input
                  name="Logo"
                  type="file"
                  onChange={(e) =>
                    setFieldValue("Logo", e.currentTarget.files[0])
                  }
                />
                <button id="editPost-btn" type="submit">
                  Edit
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        show={showDelModal}
        onHide={handleCloseDelModal}
        className="modals"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this company?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteCompany}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.shape({
    Company_ID: PropTypes.number.isRequired,
    Name: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired,
    Logo: PropTypes.string,
    Phone: PropTypes.string,
    Email: PropTypes.string,
    Activity: PropTypes.string,
    Address: PropTypes.string.isRequired,
    CreatedAt: PropTypes.string,
    User_ID: PropTypes.number.isRequired,
  }).isRequired,
};

CompanyCard.defaultProps = {
  // Define default props if needed
};
