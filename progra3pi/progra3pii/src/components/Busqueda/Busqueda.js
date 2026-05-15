import React, { useState } from "react";

function Busqueda(props) {
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("movie");

  function controlarCambios(e) 
  {
   
    if (e.target.name === "texto") {
      setTexto(e.target.value);
    } else if (e.target.name === "tipo") {
      setTipo(e.target.value);
    }
  }

  function enviarFormulario(e) {
    e.preventDefault();

    if (texto.trim() === "") 
      {
      return;
    }

    props.history.push(`/busqueda/${tipo}/${texto}`);
  }

  return (
    <form className="filter-form px-0 mb-3" onSubmit={(e) => enviarFormulario(e)}>
      <input
        type="text"
        name="texto"
        placeholder="Buscar..."
        value={texto}
        onChange={(e) => controlarCambios(e)}
      />

      <div>
        <label>
          <input
            type="radio"
            name="tipo"
            value="movie"
            checked={tipo === "movie"}
            onChange={(e) => controlarCambios(e)}
          />
          Películas
        </label>

        <label>
          <input
            type="radio"
            name="tipo"
            value="tv"
            checked={tipo === "tv"}
            onChange={(e) => controlarCambios(e)}
          />
          Series
        </label>
      </div>

      <button type="submit" className="btn btn-primary">Buscar</button>
    </form>
  


);
}

export default Busqueda;