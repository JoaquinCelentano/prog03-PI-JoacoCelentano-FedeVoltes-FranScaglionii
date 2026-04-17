import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
     <nav>
            <h2>Movies</h2>

            <ul className="nav nav-tabs my-4">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/movies" className="nav-link">Películas</Link>
                </li>
                <li className="nav-item">
                    <Link to="/series" className="nav-link">Series</Link>
                </li>
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link">Favoritas</Link>
                </li>
                <li className="nav-item ml-auto">
                    <Link to="/register" className="nav-link">Registro</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        </nav>
  );
}

export default Navbar;