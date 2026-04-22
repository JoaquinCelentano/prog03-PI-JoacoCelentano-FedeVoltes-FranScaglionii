// Punto 10 - Página Not Found
// La aplicación debe mostrar una página del tipo 404 Contenido Inexistente si el usuario ingresa una url inexistente.

import React from "react";
import { Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <h2 className="alert alert-danger">Error 404 - Página no existe</h2>
      <p>La página que buscás no existe.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;