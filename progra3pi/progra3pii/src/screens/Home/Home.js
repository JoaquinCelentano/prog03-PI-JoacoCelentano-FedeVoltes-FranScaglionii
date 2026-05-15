import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";

const apiKey = "5aba41484f01b327ba117f875007574f";

function Home(props) {
  const [populares, setPopulares] = useState([]);
  const [series, setSeries] = useState([]);
  const [cargandoPopulares, setCargandoPopulares] = useState(true);
  const [cargandoSeries, setCargandoSeries] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setPopulares(data.results);
        setCargandoPopulares(false);
      })
      .catch((err) => console.log(err));

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
        setCargandoSeries(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">

      <Filter history={props.history} />

      <h2 className="alert alert-primary">Películas más populares</h2>

      <section className="row cards">

        {cargandoPopulares ? (
          <p className="alert alert-info">Cargando...</p>
        ) : (
          populares.map((movie, i) => {
            if (i < 4) {
              return <MovieCard key={movie.id} data={movie} tipo="movie" />;
            }
            return null;
          })
        )}

      </section>

      <a href="/movies" className="btn btn-outline-primary mb-4">
        Ver todas
      </a>

      <h2 className="alert alert-warning">Series más populares</h2>

      <section className="row cards">

        {cargandoSeries ? (
          <p className="alert alert-info">Cargando...</p>
        ) : (
          series.map((serie, i) => {
            if (i < 4) {
              return <MovieCard key={serie.id} data={serie} tipo="tv" />;
            }
            return null;
          })
        )}

      </section>

      <a href="/series" className="btn btn-outline-primary mb-4">
        Ver todas
      </a>

    </div>
  );
}

export default Home;