import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../contexts/UserContext";
import { useEvent } from "../../contexts/EventContext";
import { hostname } from "../../HostnameConnect/Hostname";
import "./InviteCard.css";

export default function InviteCard({ event, inviteStatus }) {
  const { getInvites } = useEvent();
  const { users } = useUser();
  const userId = parseInt(localStorage.getItem("userId"), 10);
  const token = localStorage.getItem("userToken");
  const options = {
    month: "short",
  };

  const eventCreator =
    users.length > 0
      ? users.find((user) => user.User_ID === event.User_ID)
      : "Unknown";

  useEffect(() => {
    getInvites();
  }, [inviteStatus, eventCreator]);

  const handleAcceptDeclineInvite = async (action) => {
    console.info(action, userId);
    if (action === "Accept") {
      try {
        const response = await fetch(
          `${hostname}/events/${event.Event_ID}/invites`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, action: "Accepted" }),
          }
        );
        if (response.ok) {
          getInvites();
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    } else if (action === "Decline") {
      try {
        const response = await fetch(
          `${hostname}/events/${event.Event_ID}/invites`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, action: "Declined" }),
          }
        );
        if (response.ok) {
          getInvites();
        } else {
          console.error("Erreur lors de la requête:", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête:", error);
      }
    }
  };

  return (
    <div className="invite-card" key={event.Event_ID}>
      <div className="left-section">
        <div className="event-date">
          <span id="numeric-day">{new Date(event.StartDate).getDate()}</span>
          <span id="month">
            {new Date(event.StartDate).toLocaleDateString("fr-FR", options)}
          </span>
        </div>
        <div className="event-meta">
          <span id="event-title">{event.EventName}</span>
          <span id="event-creator">{eventCreator.FirstName}</span>
        </div>
      </div>
      <div className="right-section">
        {inviteStatus === "Pending" && (
          <>
            <button
              type="button"
              className="invite-action-btn"
              onClick={() => handleAcceptDeclineInvite("Accept")}
            >
              <i className="fas fa-check" /> Accept
            </button>
            <button
              type="button"
              className="invite-action-btn"
              onClick={() => handleAcceptDeclineInvite("Decline")}
            >
              <i className="fas fa-times" /> Decline
            </button>
          </>
        )}
        {inviteStatus === "Accepted" && (
          <div id="accepted">
            <span className="invite-status">Accepted</span>
          </div>
        )}
        {inviteStatus === "Declined" && (
          <div id="declined">
            <span className="invite-status">Declined</span>
          </div>
        )}
      </div>
    </div>
  );
}

InviteCard.propTypes = {
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
    User_ID: PropTypes.number.isRequired,
  }).isRequired,
  inviteStatus: PropTypes.string.isRequired,
};
