import React, { Component } from "react";
const apiKey ='5aba41484f01b327ba117f875007574f'

class Detalle extends Component {
    constructor(props){
        super(props);
        this.state = {
            detalle : null
        };
    };

componentDidMount() {
    let id = this.props.match.params.id;
    let tipo = this.props.match.params.tipo;
    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ detalle: data });
      })
      .catch((err) => console.log(err));
}

render() {
  return (
    <div className="container">

      {this.state.detalle && (

        <>
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
              ) : null}

              {this.props.match.params.tipo !== "movie" && (
                <>
                  <p className="mt-0 mb-0" id="episodes">
                    <strong>Número de capítulos:</strong>{" "}
                    {this.state.detalle.number_of_episodes}
                  </p>

                  <p className="mt-0 seasons">
                    <strong>Temporadas:</strong>{" "}
                    {this.state.detalle.number_of_seasons}
                  </p>
                </>
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

          {document.cookie ? (
            <button className="btn btn-primary mt-3">
              Agregar a favoritos
            </button>
          ) : null}

        </>
      )}

    </div>
  );
}
}

export default Detalle;