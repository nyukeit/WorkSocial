import headers from "../utils/apiHeaders";

const getCompanies = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/company`,
    headers
  );
  const companies = await response.json();
  return companies;
};

export default getCompanies;
