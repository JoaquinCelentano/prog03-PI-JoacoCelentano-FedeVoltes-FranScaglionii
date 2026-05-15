import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";

const apiKey = "5aba41484f01b327ba117f875007574f";

function Series(props) {
  const [series, setSeries] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [inputBusqueda, setInputBusqueda] = useState("");

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?page=1&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setSeries(data.results);
        setPagina(2);
        setCargando(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function cargarMas() {
    fetch(`https://api.themoviedb.org/3/tv/popular?page=${pagina}&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setSeries(series.concat(data.results));
        setPagina(pagina + 1);
      })
      .catch((err) => console.log(err));
  }

  function evitarSubmit(event) {
    event.preventDefault();
  }

  function controlarCambios(event) {
    setInputBusqueda(event.target.value);
  }

  const seriesFiltradas = series.filter((serie) =>
    serie.name.toLowerCase().includes(inputBusqueda.toLowerCase())
  );

  return (
    <div className="container">

      <h2 className="alert alert-warning">Todas las series</h2>

      <form className="filter-form px-0 mb-3" onSubmit={(event) => evitarSubmit(event)}>
        <input
          type="text"
          placeholder="Buscar dentro de la lista"
          value={inputBusqueda}
          onChange={(event) => controlarCambios(event)}
        />
      </form>

      <section className="row cards all-series" id="series">
        {cargando ? (
          <p className="alert alert-info">Cargando...</p>
        ) : (
          seriesFiltradas.map((serie) => (
            <MovieCard key={serie.id} data={serie} tipo="tv" />
          ))
        )}
      </section>

      <button onClick={() => cargarMas()} className="btn btn-outline-primary">
        Cargar más
      </button>

    </div>
  );
}

export default Series;