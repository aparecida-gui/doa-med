import React from 'react';
import { Link } from 'react-router-dom';

export default function NavUser() {
  return (
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
          <li className="nav-item">
            <Link
              className="nav-link"
              to={{
                pathname: `/:beneficiary_id/register_medicine_benef`,
              }}
            >
              Cadastrar os meus Medicamentos
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              to={{
                pathname: `/:beneficiary_id/view_medicine_register`,
              }}
            >
              Meus Medicamentos cadastrados
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/search_medicine">
              Pesquisar Medicamentos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
