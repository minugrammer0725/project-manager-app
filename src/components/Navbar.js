import "./Navbar.css";
import Temple from "../assets/temple.svg";

import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout, isPending } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="app logo" />
          <span>The Dojo</span>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          {isPending ? (
            <button className="btn" disabled>
              Loggint Out..
            </button>
          ) : (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
