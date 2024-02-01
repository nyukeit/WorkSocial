import React from "react";
import PropTypes from "prop-types";
import EventCard from "../EventCard/EventCard";

export default function EventList({ events }) {
  console.info("Events:", events);
  events.sort((a, b) =>
    new Date(b.StartDate) > new Date(a.StartDate) ? 1 : -1
  );

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      EventName: PropTypes.string.isRequired,
      StartDate: PropTypes.string.isRequired,
      EndDate: PropTypes.string.isRequired,
      StartTime: PropTypes.string.isRequired,
      EndTime: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Visibility: PropTypes.string.isRequired,
    })
  ).isRequired,
};
