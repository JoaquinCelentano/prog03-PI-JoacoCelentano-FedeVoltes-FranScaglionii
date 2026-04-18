import { Link } from "react-router-dom";
import React, { Component } from "react";
import Cookies from "universal-cookie";


const cookies = newCookies()


class MovieCard extends Component{

  constructor (props) {
    super(props);
    this.state = {
      mostrarDescripcion: false
    }
  }
  botonVerMas() {
    this.setState({
      mostrarDescripcion: !this.state.mostrarDescripcion
    })
  }

  render(){
  return (
    <article className="single-card-movie">

      <img
        src={"https://image.tmdb.org/t/p/w500" + this.props.data.poster_path}
        className="card-img-top"
        alt={this.props.data.title ? this.props.data.title : this.props.data.name}
      />

      <div className="cardBody">
        <h5 className="card-title">{this.props.data.title ? this.props.data.title : this.props.data.name}</h5>

{
  this.state.mostrarDescripcion && (
    <p className="card-text">
      {this.props.data.overview}
    </p>
  )
}

        <button onClick={() => this.botonVerMas()} className="btn btn-primary">{this.state.mostrarDescripcion ? "Ver menos" : "Ver más"}</button>
          <Link 
          to={`/detalle/${this.props.tipo}/${this.props.data.id}`} 
          className="btn btn-primary">Ver detalle</Link>

      </div>

    </article>
  )
}
}

export default MovieCard;