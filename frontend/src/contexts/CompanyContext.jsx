// CompanyProvider
import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const CompanyContext = createContext(null);

export function useCompany() {
  return useContext(CompanyContext);
}

export function CompanyProvider({ children }) {
  // Variables

  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    try {
      await fetch(`${import.meta.VITE_BACKEND_URL}/companies`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json().then((data) => setCompanies(data)));
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const value = useMemo(() => ({ companies, getCompanies }), [companies]);
  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}

CompanyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
