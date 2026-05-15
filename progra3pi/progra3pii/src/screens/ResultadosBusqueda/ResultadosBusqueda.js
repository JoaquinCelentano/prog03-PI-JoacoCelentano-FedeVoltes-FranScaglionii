import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

const apiKey = "5aba41484f01b327ba117f875007574f";

function ResultadosBusqueda(props) {
  const [resultados, setResultados] = useState([]);
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const textoParam = props.match.params.texto;
    const tipoParam = props.match.params.tipo;

    let endpoint = "";

    if (tipoParam === "movie") {
      endpoint = "movie";
    } else {
      endpoint = "tv";
    }

    fetch(`https://api.themoviedb.org/3/search/${endpoint}?api_key=${apiKey}&query=${textoParam}`)
      .then((res) => res.json())
      .then((data) => {
        setResultados(data.results ? data.results : []);
        setTexto(textoParam);
        setTipo(tipoParam);
        setCargando(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2 className="alert alert-primary">Resultados de búsqueda</h2>

      <p>Buscaste: {texto}</p>
      {cargando ? (
        <p>Cargando...</p>
      ) : resultados.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <section className="row cards">
          {resultados.map((resultado, i) => (
            <MovieCard key={resultado.id + i} data={resultado} tipo={tipo} />
          ))}
        </section>
      )}
    </div>
  );
}

export default ResultadosBusqueda;