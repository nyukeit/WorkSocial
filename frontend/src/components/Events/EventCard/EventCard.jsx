// Import Modules

import PropTypes from "prop-types";

// Import Styles
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function EventCard({ event }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{event.EventName}</Card.Title>
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
        <Button variant="primary">{/* actions pour l'événement ici */}</Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    EventName: PropTypes.string.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string.isRequired,
    StartTime: PropTypes.string.isRequired,
    EndTime: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Visibility: PropTypes.string.isRequired,
  }).isRequired,
};
