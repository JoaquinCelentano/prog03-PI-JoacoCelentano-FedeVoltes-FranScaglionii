import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import MovieCard from "../../components/MovieCard/MovieCard";

const cookies = new Cookies();

function Favorites(props) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (!cookies.get("userLogged")) {
      props.history.push("/login");
      return;
    }

    let favoritosStorage = localStorage.getItem("favoritos");

    if (favoritosStorage === null) {
      return;
    }

    let favoritosParseado = JSON.parse(favoritosStorage);

    setMovies(favoritosParseado.movies);
    setSeries(favoritosParseado.series);
  }, []);

  return (
    <div className="container">
      <h2 className="alert alert-primary">Películas favoritas</h2>

      {movies.length === 0 ? (
        <p>No tenés películas favoritas</p>
      ) : (
        <section className="row cards">
          {movies.map((movie, i) => (
            <MovieCard key={movie.id + i} data={movie} tipo="movie" />
          ))}
        </section>
      )}

      <h2 className="alert alert-warning">Series favoritas</h2>

      {series.length === 0 ? (
        <p>No tenés series favoritas</p>
      ) : (
        <section className="row cards">
          {series.map((serie, i) => (
            <MovieCard key={serie.id + i} data={serie} tipo="tv" />
          ))}
        </section>
      )}
    </div>
  );
}

export default Favorites;