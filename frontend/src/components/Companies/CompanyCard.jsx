// Import Modules
import PropTypes from "prop-types";

// Import Components
import Card from "react-bootstrap/Card";

// Import Images
import ImageWithJWT from "../../utils/ImageWithJWT";

export default function CompanyCard({ company }) {
  // Variables
  const imageUrl = `${import.meta.env.VITE_BACKEND_URL}/upload/${company.Logo}`;

  return (
    <div>
      <Card>
        <div className="card-img">
          <ImageWithJWT className="company-img" imageUrl={imageUrl[0]} />
        </div>
        <Card.Body>
          <Card.Title>{company.Name}</Card.Title>
          <Card.Text>
            <strong>URL:</strong> {company.url}
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
    url: PropTypes.string.isRequired,
    Logo: PropTypes.string,
    Phone: PropTypes.string,
    Email: PropTypes.string,
    Activity: PropTypes.string,
    Address: PropTypes.string.isRequired,
  }).isRequired,
};
