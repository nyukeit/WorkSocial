// Import Modules

import PropTypes from "prop-types";

// Import Styles
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Modal from "react-bootstrap/Modal";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import { Form as MyForm } from "react-bootstrap";

// // Import Utils
import ImageWithJWT from "../../../utils/ImageWithJWT";
import { hostname } from "../../../HostnameConnect/Hostname";

// // // Import Contexts
// import { useUser } from "../../../contexts/UserContext";
// import { useEvent } from "../../../contexts/EventContext";

export default function EventCard({ event }) {
  const imageUrl = `${hostname}/upload/${event.Image}`;
  console.info("event card", event);
  return (
    <Card>
      <Card.Body>
        <Card.Title>{event.EventName}</Card.Title>
        <div className="card-img">
          <ImageWithJWT imageUrl={imageUrl} className="post-img" />
        </div>
        <Card.Text>
          <strong>Start Date:</strong> {event.StartDate}
          <br />
          <strong>End Date:</strong> {event.EndDate}
          <br />
          <strong>Start Time:</strong> {event.StartTime}
          <br />
          <strong>End Time:</strong> {event.EndTime}
          <br />
          <strong>Description:</strong> {event.Description}
          <br />
          <strong>Visibility:</strong> {event.Visibility}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    Event_ID: PropTypes.number.isRequired,
    EventName: PropTypes.string.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string,
    StartTime: PropTypes.string,
    EndTime: PropTypes.string,
    Description: PropTypes.string,
    Visibility: PropTypes.string.isRequired,
    Image: PropTypes.string,
  }).isRequired,
};
