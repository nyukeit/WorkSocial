// Provider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { hostname } from "../HostnameConnect/Hostname";

const EventContext = createContext(null);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("userToken");

  const getEvents = async () => {
    try {
      const response = await fetch(`${hostname}/events`, {
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
          `${hostname}/events/${event.Event_ID}/comments`,
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

  const value = useMemo(
    () => ({ events, getEvents, comments, getComments }),
    [events, comments]
  );
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
