import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top mb-5">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <svg
            viewBox="0 0 300 30"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "450px" }}
          >
            <style>
              {`
                .text-main { fill: #2c3e50; font-weight: bold; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                .text-highlight { fill: #3498db; }
              `}
            </style>
            <text x="0" y="24" fontSize="24" className="text-main">
              My
              <tspan className="text-highlight">Agenda</tspan>
            </text>
          </svg>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Aggiungi
              </Link>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrati
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
