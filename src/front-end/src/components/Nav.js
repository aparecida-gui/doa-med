import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="navbar navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      DoaMed
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="record_options">
            Registro
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/search_medicine"
            tabindex="-1"
            aria-disabled="true"
          >
            Pesquisar Medicamentos
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;
