import { Link } from "react-router-dom";
import React, { Component } from "react";
import Cookies from "universal-cookie";


const cookies = new Cookies()


class MovieCard extends Component{

  constructor (props) {
    super(props);
    this.state = {
      mostrarDescripcion: false,
      esFavorito: false
    }
  }
  componentDidMount() {
    let favoritosStorage = localStorage.getItem("favoritos");
    if (favoritosStorage === null) return;
    let favoritosParseado = JSON.parse(favoritosStorage);
    let subArray;
    if (this.props.tipo === "movie") {
      subArray = favoritosParseado.movies;
    } else {
      subArray = favoritosParseado.series;
    }
    let coincidencias = subArray.filter(item => item.id === this.props.data.id);
    if (coincidencias.length > 0) {
      this.setState({ esFavorito: true });
    }
  }

  toggleFavorito() {
    let favoritosStorage = localStorage.getItem("favoritos");
    let favoritosParseado;
    if (favoritosStorage === null) {
      favoritosParseado = { movies: [], series: [] };
    } else {
      favoritosParseado = JSON.parse(favoritosStorage);
    }
    let subArray;
    if (this.props.tipo === "movie") {
      subArray = favoritosParseado.movies;
    } else {
      subArray = favoritosParseado.series;
    }
    let yaEsta = subArray.filter(item => item.id === this.props.data.id).length > 0;
    if (yaEsta) {
      if (this.props.tipo === "movie") {
        favoritosParseado.movies = subArray.filter(item => item.id !== this.props.data.id);
      } else {
        favoritosParseado.series = subArray.filter(item => item.id !== this.props.data.id);
      }
    } else {
      if (this.props.tipo === "movie") {
        favoritosParseado.movies.push(this.props.data);
      } else {
        favoritosParseado.series.push(this.props.data);
      }
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritosParseado));
    this.setState({ esFavorito: !this.state.esFavorito });
  }

  botonVerMas() {
    this.setState({
      mostrarDescripcion: !this.state.mostrarDescripcion
    })
  }

  render(){
  return (
    <article className="single-card-movie">

      <img
        src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path}
        className="card-img-top"
        alt={this.props.data.title ? this.props.data.title : this.props.data.name}
      />

      <div className="cardBody">
        <h5 className="card-title">{this.props.data.title ? this.props.data.title : this.props.data.name}</h5>

{
  this.state.mostrarDescripcion && (
    <p className="card-text">
      {this.props.data.overview}
    </p>
  )
}

        <button onClick={() => this.botonVerMas()} className="btn btn-primary">{this.state.mostrarDescripcion ? "Ver menos" : "Ver más"}</button>
          <Link 
          to={`/detalle/${this.props.tipo}/${this.props.data.id}`} 
          className="btn btn-primary">Ver detalle</Link>

          { cookies.get("userLogged") ? (
  <button 
    onClick={() => this.toggleFavorito()} 
    className="btn btn-primary">
    {this.state.esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
  </button>
) : null }

      </div>

    </article>
  )
}
}

export default MovieCard;