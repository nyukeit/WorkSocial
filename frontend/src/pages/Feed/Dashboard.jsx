import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Dashboard.css";
import UserBar from "../../components/UserBar/UserBar";
import EventMiniCard from "../../components/Events/EventMiniCard";
import InviteCard from "../../components/Events/InviteCard";
import { useEvent } from "../../contexts/EventContext";

export default function Dashboard() {
  const [value, setValue] = useState(new Date());
  const currentUserID = parseInt(localStorage.getItem("userId"), 10);
  const onChange = () => {
    setValue(value);
  };

  const { events, getEvents, invites, getInvites } = useEvent();
  const userIsInvited = invites
    .filter((invite) => invite.User_ID === currentUserID) // Filter events for current user
    .map((invite) => {
      const event = events.find((e) => e.Event_ID === invite.Event_ID); // Map events from the Events table
      return {
        event,
        inviteStatus: invite.invite_status,
      };
    })
    .sort((a, b) => b.event.Event_ID - a.event.Event_ID); // Sort events based on date (latest first)

  const sortedEvents = events.sort((a, b) =>
    a.StartDate > b.StartDate ? 1 : -1
  );
  const upcomingEvents = sortedEvents.filter(
    (event) => new Date(event.StartDate) >= new Date()
  );

  useEffect(() => {
    getEvents();
    getInvites();
  }, []);

  return (
    <div className="container">
      <UserBar />
      <div className="content-area">
        <div className="section">
          <h4>Invitations</h4>
          <hr />
          {userIsInvited ? (
            userIsInvited.map((invite) => (
              <InviteCard
                event={invite.event}
                key={invite.event.Event_ID}
                inviteStatus={invite.inviteStatus}
              />
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
