import React from 'react';

export default function DataMedicines({ index, name, quantity, prescription }) {
  return (
    <div className="row mb-4 row-cols-1">
      <div className="col-md-5">
        <div className="card">
          <div className="card-body">
            <p className="card-img">
              Receita Medica
              <img
                src={prescription}
                className="img-fluid rounded"
                alt="imagem da receita medica"
              />
            </p>
            <h6 key={index} className="card-title">
              {name}
            </h6>
            <p className="card-text">Quantidade: {quantity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
