import React, { Component } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Filter from "../../components/Filter/Filter";

const apiKey = "5aba41484f01b327ba117f875007574f";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      populares: [],
      series: []
    };
  }

  componentDidMount() {

    // peliculas populares
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ populares: data.results });
      })
      .catch(err => console.log(err));

    // peliculas en cartel
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ series: data.results });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">

        <h1>UdeSA Movies</h1>

        <Filter />

        
        <h2 className="alert alert-primary">Películas más populares</h2>

        <section className="row cards">

          {this.state.populares.map((movie, i) => {
            if (i < 4) {
              return <MovieCard key={movie.title + i} data={movie} tipo="movie"/>
            }
            return null;
          })}

        </section>

        <a href="/movies" className="btn btn-outline-primary mb-4">
          Ver todas
        </a>
        



       
        <h2 className="alert alert-warning">Series mas populares</h2>

        <section className="row cards">

          {this.state.series.map((serie, i) => {
            if (i < 4) {
              return <MovieCard key={serie.title + i} data={serie} tipo="tv" />
            }
            return null;
          })}

        </section>

        <a href="/series" className="btn btn-outline-warning">
          Ver todas
        </a>

      </div>
    );
  }
}

export default Home;