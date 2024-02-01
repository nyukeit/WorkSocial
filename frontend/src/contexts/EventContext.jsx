import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { hostname } from "../HostnameConnect/Hostname";

const EventContext = createContext(null);

export function useEvent() {
  return useContext(EventContext);
}

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
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

  const value = useMemo(() => ({ events, setEvents, getEvents }), [events]);
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
