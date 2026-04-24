import React, { Component } from "react";
import Cookies from "universal-cookie";

const apiKey ='5aba41484f01b327ba117f875007574f'
const cookies = new Cookies();

class Detalle extends Component {
    constructor(props){
        super(props);
        this.state = {
            detalle : null,
            esFavorito: false,
            Cargando: true
        };
    };

componentDidMount() {
    let id = this.props.match.params.id;
    let tipo = this.props.match.params.tipo;
    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ detalle: data, Cargando: false });
        let favoritosStorage = localStorage.getItem("favoritos");
        if (favoritosStorage === null) return;
        let favoritosParseado = JSON.parse(favoritosStorage);
        let subArray;
        if (this.props.match.params.tipo === "movie") {
          subArray = favoritosParseado.movies;
        } else {
          subArray = favoritosParseado.series;
        }
        let coincidencias = subArray.filter(item => item.id === data.id);
        if (coincidencias.length > 0) {
          this.setState({ esFavorito: true });
        }
      })
      .catch((err) => console.log(err));
}

ponerFavorito() {
    let favoritosStorage = localStorage.getItem("favoritos");
    let favoritosParseado;
    if (favoritosStorage === null) {
      favoritosParseado = { movies: [], series: [] };
    } else {
      favoritosParseado = JSON.parse(favoritosStorage);
    }
    let subArray;
    if (this.props.match.params.tipo === "movie") {
      subArray = favoritosParseado.movies;
    } else {
      subArray = favoritosParseado.series;
    }
    let yaEsta = subArray.filter(item => item.id === this.state.detalle.id).length > 0;
    if (yaEsta) {
      if (this.props.match.params.tipo === "movie") {
        favoritosParseado.movies = subArray.filter(item => item.id !== this.state.detalle.id);
      } else {
        favoritosParseado.series = subArray.filter(item => item.id !== this.state.detalle.id);
      }
    } else {
      if (this.props.match.params.tipo === "movie") {
        favoritosParseado.movies.push(this.state.detalle);
      } else {
        favoritosParseado.series.push(this.state.detalle);
      }
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritosParseado));
    this.setState({ esFavorito: !this.state.esFavorito });
  }

render() {
  return (
    <div className="container">

      {this.state.Cargando ? (

        <p className="alert alert-info">Cargando...</p>

      ) : (
      

        this.state.detalle && (

          <React.Fragment>

            <h2 className="alert alert-warning">
              {this.state.detalle.title ? this.state.detalle.title : this.state.detalle.name}
            </h2>

            <section className="row">

              <section className="col-md-6 info">

                <h3>Descripción</h3>

                <p className="description">
                  {this.state.detalle.overview}
                </p>

                <p className="mt-0 mb-0">
                  <strong>Calificación:</strong> {this.state.detalle.vote_average}
                </p>

                <p className="mt-0 mb-0" id="release-date">
                  <strong>Fecha de estreno:</strong>{" "}
                  {this.state.detalle.release_date
                    ? this.state.detalle.release_date
                    : this.state.detalle.first_air_date}
                </p>

                {this.props.match.params.tipo === "movie" ? (
                  <p className="mt-0 mb-0">
                    <strong>Duración:</strong> {this.state.detalle.runtime} minutos
                  </p>
                ) : (
                  <React.Fragment>
                    <p className="mt-0 mb-0">
                      <strong>Capítulos:</strong> {this.state.detalle.number_of_episodes}
                    </p>
                    <p className="mt-0 mb-0">
                      <strong>Temporadas:</strong> {this.state.detalle.number_of_seasons}
                    </p>
                  </React.Fragment>
                )}

                <p className="mt-0 mb-0">
                  <strong>Género:</strong>{" "}
                  {this.state.detalle.genres && this.state.detalle.genres.length > 0
                    ? this.state.detalle.genres[0].name
                    : "Sin género"}
                </p>

              </section>

              <img
                className="col-md-6"
                src={`https://image.tmdb.org/t/p/w500${this.state.detalle.poster_path}`}
                alt={this.state.detalle.title || this.state.detalle.name}
              />

            </section>

            {cookies.get("userLogged") ? (
              <button
                onClick={() => this.ponerFavorito()}
                className="btn btn-primary mt-3"
              >
                    {this.state.esFavorito ? "Sacar de favoritos 💔" : "Agregar a favoritos ♥️"}

              </button>
            ) : null}

          </React.Fragment>

        )

      )}

    </div>
  );
}

} 
export default Detalle;