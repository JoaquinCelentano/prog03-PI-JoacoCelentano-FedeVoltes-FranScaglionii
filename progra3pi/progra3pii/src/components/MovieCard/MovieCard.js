import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "./MovieCard.css";

const cookies = new Cookies();

function MovieCard(props) {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    let favoritosStorage = localStorage.getItem("favoritos");
    if (favoritosStorage === null) return;

    let favoritosParseado = JSON.parse(favoritosStorage);
    let array;

    if (props.tipo === "movie") 
      {
      array = favoritosParseado.movies;
    
    } 
    else {
      array = favoritosParseado.series;
    }

   
    let coincidencias = array.filter((item) => item.id === props.data.id);

    if (coincidencias.length > 0) {
      setEsFavorito(true);
    }
  }, []);

  function ponerFavorito() {
    let favoritosStorage = localStorage.getItem("favoritos");
    let favoritosParseado;

    if (favoritosStorage === null) {
      favoritosParseado = { movies: [], series: [] };
    } else {
      favoritosParseado = JSON.parse(favoritosStorage);
    }

    let array;
    if (props.tipo === "movie") {
      array = favoritosParseado.movies;
    } else {
      array = favoritosParseado.series;
    }

    let yaEsta = array.filter((item) => item.id === props.data.id).length > 0;

    if (yaEsta) {
      if (props.tipo === "movie") {
        favoritosParseado.movies = array.filter(
          (item) => item.id !== props.data.id
        );
      } else {
        favoritosParseado.series = array.filter(
          (item) => item.id !== props.data.id
        );
      }
    } else {
      if (props.tipo === "movie") {
        favoritosParseado.movies.push(props.data);
      } else {
        favoritosParseado.series.push(props.data);
      }
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritosParseado));
    setEsFavorito(!esFavorito);
  }

  function botonVerMas() {
    setMostrarDescripcion(!mostrarDescripcion);
  }

  return (
    <article className="single-card-movie">
      <img
        src={"https://image.tmdb.org/t/p/w500" + props.data.poster_path}
        className="card-img-top"
        alt={props.data.title ? props.data.title : props.data.name}
      />

      <div className="cardBody">
        <h5 className="card-title">
          {props.data.title ? props.data.title : props.data.name}
        </h5>

        {mostrarDescripcion && (
          <p className="card-text">{props.data.overview}</p>
        )}

        <button onClick={() => botonVerMas()} className="btn btn-primary">
          {mostrarDescripcion ? "Ver menos" : "Ver más"}
        </button>

        <Link
          to={`/detalle/${props.tipo}/${props.data.id}`}
          className="btn btn-primary"
        >
          Ver detalle
        </Link>

        {cookies.get("userLogged") ? (
          <button
            onClick={() => ponerFavorito()}
            className="btn btn-primary"
          >
            {esFavorito ? "💔" : "♥️"}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default MovieCard;