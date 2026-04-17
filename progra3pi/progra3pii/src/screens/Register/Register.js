import React from "react";
import { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
        };
    }

onSubmit = (e) => {
    e.preventDefault();

let usuarioACrear = {
    email: this.state.email,
    password: this.state.password,
    userName: this.state.userName,
    createdAt: new Date(),
}

    if (this.state.userName.length < 3 || this.state.userName.length > 7) {
      this.setState({
        error: "El nombre de usuario debe tener entre 3 y 7 caracteres"
      });
      return;
    }

    if (!this.state.email.includes("@")) {
      this.setState({
        error: "El email debe ser válido"
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

    localStorage.setItem("user", JSON.stringify({
        email: this.state.email,
        password: this.state.password
    }));

}

controlarCambio = (e,campo) => {
    this.setState({
        [campo]: e.target.value
    })
}

    render() {
        return (
            <div class="container">
                <h2 class="alert alert-primary">Registro</h2>

        <div class="row justify-content-center">
            <div class="col-md-6">
                <form>
                    <div class="form-group">
                        <label for="email">Nombre de usuario</label>
                        <input onChange={(e)=> this.controlarCambio(e,"userName")} type="text" class="form-control" id="userName" placeholder="Ingresá tu nombre de usuario"/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input onChange={(e)=> this.controlarCambio(e,"email")} type="email" class="form-control" id="email" placeholder="Ingresá tu email"/>
                    </div>
                    <div class="form-group">
                        <label for="password">Contraseña</label>
                        <input onChange={(e)=> this.controlarCambio(e,"password")} type="password" class="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
                </form>
                <p class="mt-3 text-center">¿Ya tenés cuenta? <a href="login.html">Iniciar sesión</a></p>
            </div>
        </div>
    </div>
    );
}
}

export default Register;