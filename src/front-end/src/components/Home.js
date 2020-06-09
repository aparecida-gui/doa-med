import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ paddingTop: ' 15rem' }}>
      <div className="jumbotron ">
        <h2 className="display-4">Seja Bem-Vindo(a) ao DoaMed</h2>
        <hr className="my-4" />
        <p className="lead">
          Você poderá consultar, reservar ou doar medicamentos.
        </p>
        <hr className="my-4" />

        <Link className="btn btn" to="/search_medicine">
          Pesquisar Medicamentos
        </Link>
      </div>
    </div>
  );
};

export default Home;
