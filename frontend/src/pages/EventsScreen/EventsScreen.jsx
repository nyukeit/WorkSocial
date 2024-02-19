import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import EventCard from "../../components/Events/EventCard";
import UserBar from "../../components/UserBar/UserBar";
import { useEvent } from "../../contexts/EventContext";
import { hostname } from "../../HostnameConnect/Hostname";
import "./EventsScreen.css";

export default function EventScreen() {
  const {
    events,
    getEvents,
    comments,
    getComments,
    likes,
    getLikes,
    invites,
    getInvites,
  } = useEvent();

  useEffect(() => {
    getLikes();
    getEvents();
    getComments();
    getInvites();
  }, []);

  const token = localStorage.getItem("userToken");
  const userID = localStorage.getItem("userId");

  events.sort((a, b) => (b.Updated_At > a.Updated_At ? 1 : -1));

  const initialValues = {
    Image: null,
    EventName: "",
    StartDate: "",
    EndDate: "",
    StartTime: "00:00:00",
    EndTime: "00:00:00",
    Description: "",
    Visibility: "Public",
    UserID: userID,
  };

  const handleCreateEvent = async (values) => {
    const {
      EventName,
      StartDate,
      EndDate,
      StartTime,
      EndTime,
      Description,
      Visibility,
      Image,
    } = values;
    try {
      const formData = new FormData();
      formData.append("EventName", EventName);
      formData.append("StartDate", StartDate);
      formData.append("EndDate", EndDate);
      formData.append("StartTime", StartTime);
      formData.append("EndTime", EndTime);
      formData.append("Description", Description);
      formData.append("Visibility", Visibility);
      formData.append("UserID", userID);

      if (Image && Image instanceof File) {
        formData.append("Image", Image);
      }
      await fetch(`${hostname}/events`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        if (res.ok) {
          getEvents();
        } else {
          console.error("Erreur lors de la requête:", res.statusText);
        }
      });
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div className="container">
      <UserBar />
      <div className="content-area">
        {events.map((event) => {
          const eventLikes = likes.filter(
            (like) => like.Event_ID === event.Event_ID
          );
          const eventComments = comments.filter(
            (comment) => comment.Event_ID === event.Event_ID
          );
          const eventInvites = invites.filter(
            (invite) => invite.Event_ID === event.Event_ID
          );
          return (
            <EventCard
              key={event.Event_ID}
              event={event}
              eventComments={eventComments}
              eventLikes={eventLikes}
              eventInvites={eventInvites}
            />
          );
        })}
      </div>
      <div className="sidebar">
        <div className="sidebar-item">
          <h3>Create Event</h3>
          <Formik initialValues={initialValues} onSubmit={handleCreateEvent}>
            {({ setFieldValue }) => (
              <Form>
                <div className="title-content">
                  <label htmlFor="EventName">Event Name</label>
                  <Field
                    name="EventName"
                    placeholder="Event Name"
                    type="text"
                    className="form-control"
                  />

                  <label htmlFor="StartDate">Start Date</label>
                  <Field
                    name="StartDate"
                    placeholder="Start Date"
                    type="date"
                    className="form-control"
                  />

                  <label htmlFor="EndDate">End Date</label>
                  <Field
                    name="EndDate"
                    placeholder="End Date"
                    type="date"
                    className="form-control"
                  />

                  <label htmlFor="StartTime">Start Time</label>
                  <Field
                    name="StartTime"
                    placeholder="Start Time"
                    type="time"
                    className="form-control"
                  />

                  <label htmlFor="EndTime">End Time</label>
                  <Field
                    name="EndTime"
                    placeholder="End Time"
                    type="time"
                    className="form-control"
                  />

                  <label htmlFor="Description">Description</label>
                  <Field
                    name="Description"
                    component="textarea"
                    rows="5"
                    placeholder="Description"
                    className="form-control"
                  />
                </div>
                <div className="visibility-group">
                  <div className="radio-group">
                    <Field name="Visibility" type="radio" value="Public" />
                    <label htmlFor="Visibility">Public</label>
                  </div>
                  <div className="radio-group">
                    <Field name="Visibility" type="radio" value="Private" />
                    <label htmlFor="Visibility">Private</label>
                  </div>
                </div>

                <div className="img-upload">
                  <label htmlFor="Image">
                    <i className="fa-solid fa-image" /> Attach Image
                  </label>
                  <input
                    id="Image"
                    name="Image"
                    type="file"
                    onChange={(event) =>
                      setFieldValue("Image", event.currentTarget.files[0])
                    }
                  />
                </div>
                <Button id="createEvent-btn" type="submit">
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
