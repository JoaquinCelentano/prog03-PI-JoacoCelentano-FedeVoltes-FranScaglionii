import React, { Component } from "react";
const apiKey ='5aba41484f01b327ba117f875007574f'
import MovieCard from "../../components/MovieCard/MovieCard";

class ResultadosBusqueda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultados: [],
      texto: "",
      tipo: "",
      cargando: true
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const texto = query.get("texto");
    const tipo = query.get("tipo");

    let endpoint = "";

    if (tipo === "movie") {
      endpoint = "movie";
    } else {
      endpoint = "tv";
    }

    fetch(`https://api.themoviedb.org/3/search/${endpoint}?api_key=${apiKey}&query=${texto}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          resultados: data.results ? data.results : [],
          texto: texto,
          tipo: tipo,
          cargando: false
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <h2 className="alert alert-primary">Resultados de búsqueda</h2>

        <p>Buscaste: {this.state.texto}</p>
        {this.state.cargando ? (<p>Cargando...</p>) : this.state.resultados.length === 0 ? (<p>No se encontraron resultados.</p>) : (
          
          <section className="row cards">
            {this.state.resultados.map((resultado, i) => (
              <MovieCard key={resultado.id + i} data={resultado} tipo={this.state.tipo} />
            ))}
          </section>
        )}
      </div>
    );
  }
}

export default ResultadosBusqueda;