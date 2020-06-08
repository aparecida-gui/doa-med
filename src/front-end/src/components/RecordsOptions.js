import React from 'react';
import { Link } from 'react-router-dom';

export const RecordsOptions = () => {
  return (
    <div className="text-center">
      <h3>Escolha uma opção:</h3>
      <Link to="/register_beneficiary">
        <h4>Registrar Beneficiario</h4>
      </Link>
      <Link to="/register_donor">
        <h4>Registrar Doador</h4>
      </Link>
    </div>
  );
};

export default RecordsOptions;
