import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./screens/Home/Home";
import Movies from "./screens/Movies/Movies";
import Series from "./screens/Series/Series";
import Favorites from "./screens/Favorites/Favorites";
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import Detalle from './screens/Detalle/Detalle';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
  <Navbar />
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/movies" component={Movies} />
    <Route path="/series" component={Series} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/detalle/:tipo/:id" component={Detalle} />
  </Switch>

  <Footer />
</BrowserRouter>
    </div>
  );
}

export default App;
