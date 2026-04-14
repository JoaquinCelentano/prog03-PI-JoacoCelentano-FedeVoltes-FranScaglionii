import React, { Component } from "react";
import MovieCard from "../MovieCard/MovieCard";
import Filter from "../Filter/Filter";

const apiKey = "5aba41484f01b327ba117f875007574f";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      populares: [],
      cartel: []
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
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ cartel: data.results });
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
              return <MovieCard key={movie.title + i} data={movie} />
            }
            return null;
          })}

        </section>

        <a href="/movies" className="btn btn-outline-primary mb-4">
          Ver todas
        </a>
        



       
        <h2 className="alert alert-warning">Películas en cartel</h2>

        <section className="row cards">

          {this.state.cartel.map((movie, i) => {
            if (i < 4) {
              return <MovieCard key={movie.title + i} data={movie} />
            }
            return null;
          })}

        </section>

        <a href="/movies" className="btn btn-outline-warning">
          Ver todas
        </a>

      </div>
    );
  }
}

export default Home;