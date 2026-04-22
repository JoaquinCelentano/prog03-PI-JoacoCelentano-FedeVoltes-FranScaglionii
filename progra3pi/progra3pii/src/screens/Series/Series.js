import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";

const apiKey = "5aba41484f01b327ba117f875007574f";

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      pagina: 1,
      Cargando: true   // 🔥 agregado
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/tv/popular?page=${this.state.pagina}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          series: data.results,
          pagina: this.state.pagina + 1,
          Cargando: false   
        });
      })
      .catch(err => console.log(err));
  }

  cargarMas = () => {
    fetch(`https://api.themoviedb.org/3/tv/popular?page=${this.state.pagina}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          series: this.state.series.concat(data.results),
          pagina: this.state.pagina + 1
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">

        <h2 className="alert alert-warning">Todas las series</h2>
        

        <section className="row cards all-series" id="series">

          {this.state.Cargando ? (

            <p className="alert alert-info">Cargando...</p>

          ) : (

            this.state.series.map((serie, i) => (
              <MovieCard key={serie.id} data={serie} tipo="tv" />
            ))

          )}

        </section>

        <button onClick={this.cargarMas} className="btn btn-warning">
          Cargar más
        </button>

      </div>
    );
  }
}

export default Series;