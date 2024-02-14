// Company Card
import PropTypes from "prop-types";

import Card from "react-bootstrap/Card";

import ImageWithJWT from "../../utils/ImageWithJWT";
import { hostname } from "../../HostnameConnect/Hostname";

// import { useCompany } from "../../contexts/CompanyContext";

export default function CompanyCard({ company }) {
  const imageUrl = `${hostname}/upload/${company.Logo}`;

  return (
    <div>
      <Card>
        <div className="card-img">
          <ImageWithJWT className="company-img" imageUrl={imageUrl[0]} />
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
    </div>
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
  }).isRequired,
};
