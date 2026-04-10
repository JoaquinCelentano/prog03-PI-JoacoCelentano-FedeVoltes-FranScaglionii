  
  function Movies() {
  return (
    <div className="container">

      <h2 className="alert alert-primary">Todas las películas</h2>

      <form className="filter-form px-0 mb-3">
        <input type="text" placeholder="Buscar dentro de la lista" />
      </form>

      <button className="btn btn-info">Cargar más</button>

      <section className="row cards all-movies">
       <article class="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/tzrJulItjttxzoX0t3B2My46TS7.jpg" class="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">The Thursday Murder Club</h5>
                    <p className="card-text">A group of senior sleuths passionate about solving cold cases get plunged into
                        a real-life murder mystery in this comic crime caper.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">F1</h5>
                    <p className="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">I Know What You Did Last Summer</h5>
                    <p className="card-text">When five friends inadvertently cause a deadly car accident, they cover up
                        their involvement and make a pact to keep it a secret rather than face the consequences. A year
                        later, their past comes back to haunt them and they're forced to confront a horrifying truth:
                        someone knows what they did last summer…and is hell-bent on revenge.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">Superman</h5>
                    <p className="card-text">Superman, a journalist in Metropolis, embarks on a journey to reconcile his
                        Kryptonian heritage with his human upbringing as Clark Kent.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                </div>
            </article>
                        <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/9PXZIUsSDh4alB80jheWX4fhZmy.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">F1</h5>
                    <p className="card-text">Racing legend Sonny Hayes is coaxed out of retirement to lead a struggling
                        Formula 1 team—and mentor a young hotshot driver—while chasing one more chance at glory.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                </div>
            </article>
            <article className="single-card-movie">
                <img src="https://image.tmdb.org/t/p/w500/A06yXys3hrCWu8xiNoHCFLTG5SH.jpg" className="card-img-top"
                    alt="..."/>
                <div className="cardBody">
                    <h5 className="card-title">I Know What You Did Last Summer</h5>
                    <p className="card-text">When five friends inadvertently cause a deadly car accident, they cover up
                        their involvement and make a pact to keep it a secret rather than face the consequences. A year
                        later, their past comes back to haunt them and they're forced to confront a horrifying truth:
                        someone knows what they did last summer…and is hell-bent on revenge.</p>
                    <a href="movie.html" className="btn btn-primary">Ver más</a>
                </div>
            </article>
            
      </section>
    </div>
  );
}




export default Movies;