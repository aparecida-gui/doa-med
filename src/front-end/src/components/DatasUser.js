import React from 'react';

export default function DatasUser({ index, name, email, phone, city }) {
  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <h3 className="card-text">Seus Dados</h3>
          <p className="card-title" key={index}>
            {name}
          </p>
          <p className="card-text">{email}</p>
          <p className="card-text">{phone}</p>
          <p className="card-text">{city}</p>
        </div>
      </div>
    </div>
  );
}
