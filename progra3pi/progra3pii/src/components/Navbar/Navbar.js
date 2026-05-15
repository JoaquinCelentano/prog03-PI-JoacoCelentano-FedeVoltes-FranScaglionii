import React from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Navbar.css";

const cookies = new Cookies();

function Navbar(props) {
  function logout() {
    cookies.remove("userLogged", { path: "/" });
    props.history.push("/");
  }

  const isLogged = cookies.get("userLogged");

  return (
    <div className="container">
      <h1></h1>

      <nav>
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

          {isLogged ? (
            <React.Fragment>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">Favoritas</Link>
              </li>
              <li className="nav-item ml-auto">
                <button className="nav-link btn" onClick={() => logout()}>Cerrar sesión</button>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li className="nav-item ml-auto">
                <Link to="/register" className="nav-link">Registro</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Navbar);