import React, { Component } from "react";

class Busqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: "",
      tipo: "movie"
    };
  }

  controlarCambios(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  enviarFormulario(e) {
    e.preventDefault();

    if (this.state.texto.trim() === "") {
      return;
    }

  this.props.history.push(`/busqueda/${this.state.tipo}/${this.state.texto}`);
  }

  render() {
    return (
      <form className="filter-form px-0 mb-3" onSubmit={(e) => this.enviarFormulario(e)}>
        <input type="text" name="texto" placeholder="Buscar..." value={this.state.texto} onChange={(e) => this.controlarCambios(e)} />

        <div>
          <label>
            <input type="radio" name="tipo" value="movie" checked={this.state.tipo === "movie"} onChange={(e) => this.controlarCambios(e)} />
            Películas
          </label>

          <label>
            <input type="radio" name="tipo" value="tv" checked={this.state.tipo === "tv"} onChange={(e) => this.controlarCambios(e)} />
            Series
          </label>
        </div>

        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
    );
  }
}

export default Busqueda;