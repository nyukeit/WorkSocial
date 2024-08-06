import headers from "../utils/apiHeaders";

const getUsers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/users`,
    headers
  );
  const users = await response.json();
  return users;
};

export default getUsers;
