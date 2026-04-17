import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      error: ""
    };
  }

  controlarCambio = (e, campo) => {
    this.setState({
      [campo]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let usuarioACrear = {
      username: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      createdAt: Date.now()
    };

    if (this.state.userName.length < 3 || this.state.userName.length > 7) {
      this.setState({
        error: "La extensión del nombre de usuario debe ser de 3 a 7 caracteres"
      });
      return;
    }

    if (!this.state.email.includes("@")) {
      this.setState({
        error: "Email inválido"
      });
      return;
    }

    if (this.state.password.length < 5 || this.state.password.length > 12) {
      this.setState({
        error: "La extensión de la contraseña debe ser de 5 a 12 caracteres"
      });
      return;
    }

    let usersStorage = localStorage.getItem("users");

    if (usersStorage !== null) {
      let usersParseado = JSON.parse(usersStorage);

      let usersFiltrado = usersParseado.filter(
        (unUser) => unUser.email === this.state.email
      );

      if (usersFiltrado.length > 0) {
        this.setState({
          error: "Ya existe un usuario con el email ingresado"
        });
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

    this.setState({ error: "" });
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">

        <h2 className="alert alert-primary">Registro</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            {this.state.error && (
              <p style={{ color: "red" }}>{this.state.error}</p>
            )}

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="userName">Nombre de usuario</label>
                <input onChange={(e) => this.controlarCambio(e, "userName")} type="text" className="form-control" id="userName" placeholder="Ingresá tu nombre de usuario"/>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => this.controlarCambio(e, "email")} type="email" className="form-control" id="email" placeholder="Ingresá tu email"/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input onChange={(e) => this.controlarCambio(e, "password")}type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña"/>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
            </form>

            <p className="mt-3 text-center"><a href="/login">Iniciar sesión</a></p>

          </div>
        </div>

      </div>
    );
  }
}

export default Register;