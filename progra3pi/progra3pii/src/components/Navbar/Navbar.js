import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Navbar extends Component {
  render() {
    const isLogged = cookies.get("userLogged");

    let navLinks;
    if (isLogged) {
      navLinks = (
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">Favoritas</Link>
        </li>
      );
    } else {
      navLinks = (
        <React.Fragment>
          <li className="nav-item ml-auto">
            <Link to="/register" className="nav-link">Registro</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </React.Fragment>
      );
    }

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

          {navLinks}
        </ul>
      </nav>
    );
  }
}

export default Navbar;