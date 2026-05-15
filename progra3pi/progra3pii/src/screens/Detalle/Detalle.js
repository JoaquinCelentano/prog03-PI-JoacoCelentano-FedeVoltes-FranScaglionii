import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const apiKey = "5aba41484f01b327ba117f875007574f";
const cookies = new Cookies();

function Detalle(props) {
  const [detalle, setDetalle] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let id = props.match.params.id;
    let tipo = props.match.params.tipo;

    fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setDetalle(data);
        setCargando(false);

        let favoritosStorage = localStorage.getItem("favoritos");

        if (favoritosStorage === null) {
          return;
        }

        let favoritosParseado = JSON.parse(favoritosStorage);

        let subArray;

        if (tipo === "movie") {
          subArray = favoritosParseado.movies;
        } else {
          subArray = favoritosParseado.series;
        }

        let coincidencias = subArray.filter((item) => item.id === data.id);

        if (coincidencias.length > 0) {
          setEsFavorito(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function ponerFavorito() {
    let favoritosStorage = localStorage.getItem("favoritos");
    let favoritosParseado;

    if (favoritosStorage === null) {
      favoritosParseado = { movies: [], series: [] };
    } else {
      favoritosParseado = JSON.parse(favoritosStorage);
    }

    let tipo = props.match.params.tipo;
    let subArray;

    if (tipo === "movie") {
      subArray = favoritosParseado.movies;
    } else {
      subArray = favoritosParseado.series;
    }

    let yaEsta = subArray.filter((item) => item.id === detalle.id).length > 0;

    if (yaEsta) {
      if (tipo === "movie") {
        favoritosParseado.movies = subArray.filter(
          (item) => item.id !== detalle.id
        );
      } else {
        favoritosParseado.series = subArray.filter(
          (item) => item.id !== detalle.id
        );
      }
    } else {
      if (tipo === "movie") {
        favoritosParseado.movies.push(detalle);
      } else {
        favoritosParseado.series.push(detalle);
      }
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritosParseado));

    setEsFavorito(!esFavorito);
  }

  return (
    <div className="container">
      {cargando ? (
        <p className="alert alert-info">Cargando...</p>
      ) : (
        detalle && (
          <React.Fragment>
            <h2 className="alert alert-warning">
              {detalle.title ? detalle.title : detalle.name}
            </h2>

            <section className="row">
              <section className="col-md-6 info">
                <h3>Descripción</h3>

                <p className="description">{detalle.overview}</p>

                <p className="mt-0 mb-0">
                  <strong>Calificación:</strong> {detalle.vote_average}
                </p>

                <p className="mt-0 mb-0" id="release-date">
                  <strong>Fecha de estreno:</strong>{" "}
                  {detalle.release_date
                    ? detalle.release_date
                    : detalle.first_air_date}
                </p>

                {props.match.params.tipo === "movie" ? (
                  <p className="mt-0 mb-0">
                    <strong>Duración:</strong> {detalle.runtime} minutos
                  </p>
                ) : (
                  <React.Fragment>
                    <p className="mt-0 mb-0">
                      <strong>Capítulos:</strong>{" "}
                      {detalle.number_of_episodes}
                    </p>

                    <p className="mt-0 mb-0">
                      <strong>Temporadas:</strong>{" "}
                      {detalle.number_of_seasons}
                    </p>
                  </React.Fragment>
                )}

                <p className="mt-0 mb-0">
                  <strong>Género:</strong>{" "}
                  {detalle.genres && detalle.genres.length > 0
                    ? detalle.genres[0].name
                    : "Sin género"}
                </p>
              </section>

              <img
                className="col-md-6"
                src={`https://image.tmdb.org/t/p/w500${detalle.poster_path}`}
                alt={detalle.title || detalle.name}
              />
            </section>

            {cookies.get("userLogged") ? (
              <button
                onClick={() => ponerFavorito()}
                className="btn btn-primary mt-3"
              >
                {esFavorito
                  ? "Sacar de favoritos 💔"
                  : "Agregar a favoritos ♥️"}
              </button>
            ) : null}
          </React.Fragment>
        )
      )}
    </div>
  );
}

export default Detalle;