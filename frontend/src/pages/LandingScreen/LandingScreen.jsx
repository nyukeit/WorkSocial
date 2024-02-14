import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingScreen() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });
  return (
    <div className="container">
      <h1>Welcome to WorkSocial</h1>
    </div>
  );
}
