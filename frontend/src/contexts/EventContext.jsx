// Provider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const EventContext = createContext(null);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  // Variables

  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [invites, setInvites] = useState([]);
  const token = localStorage.getItem("userToken");

  const getEvents = async () => {
    try {
      const response = await fetch(`${import.meta.VITE_BACKEND_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Erreur lors de la requête:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const getComments = async () => {
    try {
      const commentRequests = events.map(async (event) => {
        const response = await fetch(
          `${import.meta.VITE_BACKEND_URL}/events/${event.Event_ID}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          return response.json();
        }
        return null;
      });

      const allComments = await Promise.all(commentRequests);
      const flattenedComments = allComments.flat();
      setComments(flattenedComments);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const getLikes = async () => {
    try {
      const likeRequests = events.map(async (event) => {
        const response = await fetch(
          `${import.meta.VITE_BACKEND_URL}/events/${event.Event_ID}/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          return response.json();
        }
        return null;
      });

      const allLikes = await Promise.all(likeRequests);
      const flattenedLikes = allLikes.flat();
      setLikes(flattenedLikes);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const getInvites = async () => {
    try {
      const inviteRequests = events.map(async (event) => {
        const response = await fetch(
          `${import.meta.VITE_BACKEND_URL}/events/${event.Event_ID}/invites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          return response.json();
        }
        return null;
      });

      const allInvites = await Promise.all(inviteRequests);
      const flattenedInvites = allInvites.flat();
      setInvites(flattenedInvites);
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const value = useMemo(
    () => ({
      events,
      getEvents,
      comments,
      getComments,
      likes,
      getLikes,
      invites,
      getInvites,
    }),
    [events, comments, likes, invites]
  );
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
