import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Dashboard.css";
import UserBar from "../../components/UserBar/UserBar";
import EventMiniCard from "../../components/Events/EventMiniCard";
import { useEvent } from "../../contexts/EventContext";

export default function Dashboard() {
  const [value, setValue] = useState(new Date());
  const currentUserID = parseInt(localStorage.getItem("userId"), 10);
  const onChange = () => {
    setValue(value);
  };

  const { events, getEvents, invites, getInvites } = useEvent();

  const userIsInvited = invites
    .filter((invite) => invite.User_ID === currentUserID)
    .map((invite) => {
      return events.find((event) => event.Event_ID === invite.Event_ID);
    });
  const sortedEvents = events.sort((a, b) =>
    a.StartDate > b.StartDate ? 1 : -1
  );
  const upcomingEvents = sortedEvents.filter(
    (event) => new Date(event.StartDate) >= new Date()
  );

  const options = {
    month: "short",
  };

  useEffect(() => {
    getEvents();
    getInvites();
  }, [events, invites]);

  return (
    <div className="container">
      <UserBar />
      <div className="content-area">
        <div className="section">
          <h4>Invitations</h4>
          <hr />
          {userIsInvited ? (
            userIsInvited.map((event) => (
              <div className="invite-card" key={event.Event_ID}>
                <div className="left-section">
                  <div className="event-date">
                    <span id="numeric-day">
                      {new Date(event.StartDate).getDate()}
                    </span>
                    <span id="month">
                      {new Date(event.StartDate).toLocaleDateString(
                        "fr-FR",
                        options
                      )}
                    </span>
                  </div>
                  <p id="event-title">{event.EventName}</p>
                </div>
                <div className="right-section">
                  <button type="button" className="invite-action-btn">
                    <i className="fas fa-check" /> Accept
                  </button>
                  <button type="button" className="invite-action-btn">
                    <i className="fas fa-times" /> Decline
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No invitations</p>
          )}
        </div>
        <div className="section">
          <h4>Upcoming Events</h4>
          <hr />
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => {
              // Calculate the number of milliseconds between the event start date and current date
              const timeDiff =
                new Date(event.StartDate).getTime() - new Date().getTime();

              // Calculate the number of days remaining
              const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

              return (
                <div className="event-card" key={event.Event_ID}>
                  <EventMiniCard event={event} daysRemaining={daysRemaining} />
                </div>
              );
            })
          ) : (
            <p>No upcoming events</p>
          )}
        </div>
      </div>
      <div className="sidebar">
        <div className="sidebar-item">
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
}
