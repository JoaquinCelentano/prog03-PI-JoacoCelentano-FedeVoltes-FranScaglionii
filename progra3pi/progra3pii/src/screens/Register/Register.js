import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  function controlarCambio(e, campo) {
    if (campo === "email") {
      setEmail(e.target.value);
    } else if (campo === "password") {
      setPassword(e.target.value);
    } else if (campo === "userName") {
      setUserName(e.target.value);
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    let usuarioACrear = {
      username: userName,
      email: email,
      password: password,
      createdAt: Date.now()
    };

    if (userName.length < 3 || userName.length > 7) {
      setError("La extensión del nombre de usuario debe ser de 3 a 7 caracteres");
      return;
    }

    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }

    if (password.length < 5 || password.length > 12) {
      setError("La extensión de la contraseña debe ser de 5 a 12 caracteres");
      return;
    }

    let usersStorage = localStorage.getItem("users");

    if (usersStorage !== null) {
      let usersParseado = JSON.parse(usersStorage);

      let usersFiltrado = usersParseado.filter(
        (unUser) => unUser.email === email
      );

      if (usersFiltrado.length > 0) {
        setError("Ya existe un usuario con el email ingresado");
        return;
      } else {
        usersParseado.push(usuarioACrear);

        let usersEnJson = JSON.stringify(usersParseado);

        localStorage.setItem("users", usersEnJson);
      }
    } else {
      let usersInicial = [usuarioACrear];
      let usersEnJson = JSON.stringify(usersInicial);

      localStorage.setItem("users", usersEnJson);
    }

    setError("");
    props.history.push("/login");
  }

  return (
    <div className="container">

      <h2 className="alert alert-primary">Registro</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="userName">Nombre de usuario</label>
              <input
                onChange={(e) => controlarCambio(e, "userName")}
                type="text"
                className="form-control"
                id="userName"
                placeholder="Ingresá tu nombre de usuario"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => controlarCambio(e, "email")}
                type="email"
                className="form-control"
                id="email"
                placeholder="Ingresá tu email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                onChange={(e) => controlarCambio(e, "password")}
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingresá tu contraseña"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
          </form>

          <p className="mt-3 text-center"><a href="/login">Iniciar sesión</a></p>

        </div>
      </div>

    </div>
  );
}

export default Register;