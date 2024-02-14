import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingScreen.css";

export default function LandingScreen() {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });
  return (
    <div className="container landing">
      <h1>Welcome to WorkSocial</h1>
    </div>
  );
}
