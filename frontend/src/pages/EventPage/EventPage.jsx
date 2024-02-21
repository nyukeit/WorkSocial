import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEvent } from "../../contexts/EventContext";
import UserBar from "../../components/UserBar/UserBar";
import { hostname } from "../../HostnameConnect/Hostname";
import ImageWithJWT from "../../utils/ImageWithJWT";
import { useUser } from "../../contexts/UserContext";
import EventMap from "../../components/EventMap/EventMap";
import "./EventPage.css";

export default function EventPage() {
  const { eventId } = useParams();
  const { events, getEvents, getInvites } = useEvent();
  const { users } = useUser();
  useEffect(() => {
    getEvents();
    getInvites();
  }, []);

  // Find the Event to Display
  const event =
    events.length > 0
      ? events.find((e) => e.Event_ID === parseInt(eventId, 10))
      : "loading...";

  // Mapping Creators
  const eventCreator =
    users.length > 0
      ? users.find((user) => user.User_ID === event.User_ID)
      : "loading...";

  // Event Image URL
  const ImageUrl = [
    `${hostname}/upload/${event.Image}`,
    `${hostname}/upload/${eventCreator.ProfileImage}`,
  ];

  // Date Formatting Options
  const formattedTime = (time) => {
    const timeParts = time.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    return `${hours}:${minutes.toString().padStart(2, "0")} CET`;
  };

  // Map Attendees
  // const attendeesList =
  //   invites.length > 0
  //     ? invites
  //         .filter(
  //           (invite) =>
  //             invite.Event_ID === event.Event_ID && invite.status === "Accepted"
  //         )
  //         .map((invite) => invite.User_ID)
  //     : "No attendees yet";
  // console.info(attendeesList);
  // const attendeesData =
  //   attendeesList.length > 0
  //     ? attendeesList.map((id) => {
  //         const user = users.find((u) => u.User_ID === id);
  //         return user;
  //       })
  //     : "No attendees yet";

  return (
    <div className="container">
      <UserBar />
      <div className="content-area">
        <div className="section">
          <h1>{event.EventName}</h1>
          <div className="profile">
            <div className="profileImgDiv">
              <ImageWithJWT className="pcProfileImg" imageUrl={ImageUrl[1]} />
            </div>
            <span className="username">{eventCreator.FirstName}</span>
          </div>
        </div>
        <div className="section event-img">
          <ImageWithJWT src={ImageUrl[0]} alt="event" />
        </div>
        <div className="section">
          <h4>Details</h4>
          <hr />
          <p>{event.Description}</p>
        </div>
        <div className="section">
          <h4>Attendees</h4>
          <hr />
          <p>No attendees yet</p>
        </div>
      </div>
      <div className="sidebar">
        <div className="sidebar-item">
          <div id="event-date">
            <div>
              <i className="fas fa-calendar-alt" /> Starts
            </div>
            <div id="start">
              {new Date(event.StartDate)
                .toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "short",
                  weekday: "short",
                  day: "numeric",
                })
                .toUpperCase()}
              <span>at</span>
              {formattedTime(event.StartTime)}
            </div>
            <div id="end">
              <i className="fas fa-calendar-alt" /> Ends
            </div>
            <div>
              <span>
                {new Date(event.StartDate)
                  .toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    weekday: "short",
                    day: "numeric",
                  })
                  .toUpperCase()}
              </span>
              <span>at {formattedTime(event.EndTime)}</span>
            </div>
          </div>
          <div id="location">
            <i className="fas fa-map-marker-alt" /> Location
          </div>
          <div>
            <span>Aix-en-Provence</span>
          </div>
          <div id="event-map">
            <EventMap />
          </div>
        </div>
      </div>
    </div>
  );
}
