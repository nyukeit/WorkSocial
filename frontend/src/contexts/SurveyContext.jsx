// PostProvider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { hostname } from "../HostnameConnect/Hostname";

const SurveyContext = createContext(null);

export function useSurvey() {
  return useContext(SurveyContext);
}

export function SurveyProvider({ children }) {
  const [surveys, setSurveys] = useState([]);
  const token = localStorage.getItem("userToken");

  const getSurveys = async () => {
    try {
      const response = await fetch(`${hostname}/surveys`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSurveys(data);
        console.info(data);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const value = useMemo(() => ({ surveys, setSurveys, getSurveys }), [surveys]);
  return (
    <SurveyContext.Provider value={value}>{children}</SurveyContext.Provider>
  );
}

SurveyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
