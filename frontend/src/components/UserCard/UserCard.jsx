import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importez PropTypes depuis la bibliothèque prop-types
import "./UserCard.css";

function UserCard({ user }) {
  const [imageString, setImageString] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;
  const getBase64Img = async (res) => {
    const blob = await res.blob();
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return reader.result;
  };

  useEffect(() => {
    fetch(`${url}/upload/${user.ProfileImage}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then(getBase64Img)
      .then((imgString) => setImageString(imgString));
  }, []);
  return (
    <div className="user-card">
      <img src={imageString} alt={user.FirstName} />
      <div className="user-info">
        <h2>
          {user.FirstName} {user.LastName}
        </h2>
        <p>Age: {user.Age}</p>
        <p>Genre: {user.Gender}</p>
        {/* <p>Email: {user.Email}</p>
        <p>Adresse: {user.Address}</p>
        <p>Date de naissance: {user.BirthDate}</p> */}
      </div>
    </div>
  );
}

// Spécifiez les validations de props pour votre composant
UserCard.propTypes = {
  user: PropTypes.shape({
    ProfileImage: PropTypes.string,
    FirstName: PropTypes.string,
    LastName: PropTypes.string,
    Age: PropTypes.number,
    Gender: PropTypes.string,
    // Email: PropTypes.string,
    // Address: PropTypes.string,
    // BirthDate: PropTypes.string,
    // // Ajoutez d'autres validations de props ici si nécessaire
  }).isRequired, // Vous pouvez également spécifier isRequired si la prop est obligatoire
};

export default UserCard;
