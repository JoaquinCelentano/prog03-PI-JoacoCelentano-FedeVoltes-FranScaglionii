import React, { Component } from "react";  
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";

const apiKey = '5aba41484f01b327ba117f875007574f';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pagina: 1,
      Cargando: true,
      inputBusqueda: ""
    };
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${this.state.pagina}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: data.results,
          pagina: this.state.pagina + 1,
          Cargando: false  
        });
      })
      .catch(err => console.log(err));
  }

  cargarMas = () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${this.state.pagina}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: this.state.movies.concat(data.results),
          pagina: this.state.pagina + 1
        });
      })
      .catch(err => console.log(err));
  };

  evitarSubmit(event) {
    event.preventDefault();
  }

  controlarCambios(event) {
    this.setState({
      inputBusqueda: event.target.value
    });
  }

  render() {
    let moviesFiltradas = this.state.movies.filter(function(movie) {
      return movie.title.toLowerCase().includes(this.state.inputBusqueda.toLowerCase());
    }.bind(this));

    return (
      <div className="container">

        <h2 className="alert alert-primary">Todas las películas</h2>

        {/* 🔥 filtro en vivo */}
        <form className="filter-form px-0 mb-3" onSubmit={(event) => this.evitarSubmit(event)}>
          <input type="text" placeholder="Buscar dentro de la lista" value={this.state.inputBusqueda} onChange={(event) => this.controlarCambios(event)}/>
        </form>

        <section className="row cards">

          {this.state.Cargando ? (
            <p className="alert alert-info">Cargando...</p> ) : ( moviesFiltradas.map((movie) => (
              <MovieCard key={movie.id} data={movie} tipo="movie" />
            ))

          )}

        </section>

        <button onClick={this.cargarMas} className="btn btn-outline-primary">
          Cargar más
        </button>

      </div>
    );
  }
}

export default Movies;