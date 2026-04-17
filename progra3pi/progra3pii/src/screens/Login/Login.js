import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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

    let usersStorage = localStorage.getItem("users");

    if (usersStorage === null) {
      this.setState({
        error: "No hay usuarios registrados"
      });
      return;
    }

    let usersParseado = JSON.parse(usersStorage);

    let usuarioEncontrado = usersParseado.find((user) => user.email === this.state.email && user.password === this.state.password);

    if (!usuarioEncontrado) {
      this.setState({
        error: "Credenciales inválidas"
      });
      return;
    }

    cookies.set("userLogged", true, { path: "/" });

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">

        <h2 className="alert alert-primary">Iniciar sesión</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">

            {this.state.error && (
              <p style={{ color: "red" }}>{this.state.error}</p>
            )}

            <form onSubmit={this.onSubmit}>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Ingresá tu email" onChange={(e) => this.controlarCambio(e, "email")}/>
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" onChange={(e) => this.controlarCambio(e, "password")}/>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>

            </form>

            <p className="mt-3 text-center"><a href="/register">Registrarse</a></p>

          </div>
        </div>

      </div>
    );
  }
}

export default Login;