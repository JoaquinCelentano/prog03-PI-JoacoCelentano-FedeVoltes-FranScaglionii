import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import Favorites from "./components/Favorites/Favorites";
import Login from './components/Login/Login';
import Register from './components/Register/Register';


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
  </Switch>

  <Footer />
</BrowserRouter>
    </div>
  );
}

export default App;
