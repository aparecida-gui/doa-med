import React from 'react';
import { Link } from 'react-router-dom';

export default function DataMedicines({
  index,
  name,
  quantity,
  prescription,
  id,
}) {
  return (
    <div className="row mb-4 row-cols-1">
      <div className="col-md-5">
        <div className="card">
          <div className="card-body">
            <p className="card-img">
              <img
                src={prescription}
                className="img-fluid rounded"
                alt="imagem da receita medica"
              />
            </p>
            <h6 key={index} className="card-title">
              Nome do Medicamento: {name}
            </h6>
            <p className="card-text">Quantidade: {quantity}</p>
          </div>
          <div className="card-body">
            <Link to={`/edit/${id}`} className="card-link">
              Editar
            </Link>
            <Link to={`/delete/${id}`} className="card-link">
              Excluir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
