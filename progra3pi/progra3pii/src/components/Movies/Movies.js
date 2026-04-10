import React, {Component} from "react";  
import MovieCard from "../MovieCard/MovieCard";
import Filter from "../Filter/Filter";
const apiKey ='5aba41484f01b327ba117f875007574f'
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      pagina: 1
    };
  }

  componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/now_playing?page=${this.state.pagina}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          movies: data.results,
          pagina : this.state.pagina + 1
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
          pagina : this.state.pagina + 1
        });
      })
      .catch(err => console.log(err));
  };

  render(){
    return(

         
  <div className="container">

    <h2 className="alert alert-primary">Todas las películas</h2>
    <Filter/>

    <section className="row cards">

      {this.state.movies.map((movie, i) => (
        <MovieCard key={movie.title + i} data={movie} />
      ))}

    </section>
      <button onClick={this.cargarMas}>Cargar más</button>

  </div>
);
    
  }

}

export default Movies;