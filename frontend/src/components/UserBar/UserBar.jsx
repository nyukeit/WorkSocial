import React from "react";
import { Link } from "react-router-dom";
import "./UserBar.css";

export default function UserBar() {
  return (
    <nav className="UserBar">
      <ul className="NavLinks">
        <li>
          <Link to="/dashboard">
            <i className="fas fa-home" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/posts">
            <i className="fas fa-edit" /> Posts
          </Link>
        </li>
        <li>
          <Link to="/surveys">
            <i className="fas fa-poll" /> Surveys
          </Link>
        </li>
        <li>
          <Link to="/events">
            <i className="fas fa-calendar-alt" /> Events
          </Link>
        </li>
        <li>
          <Link to="/members">
            <i className="fas fa-users" /> Membres
          </Link>
        </li>
      </ul>
    </nav>
  );
}
