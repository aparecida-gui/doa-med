import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DatasUser = ({ index, name, email, phone, city }) => (
  <div className="media data-user">
    <div className="media-body">
      <ul key={index}>
        <li>{name}</li>
        <li>{email}</li>
        <li>{phone}</li>
        <li>{city}</li>
      </ul>
    </div>
  </div>
);

const DataMedicines = ({ index, name, quantity, prescription }) => (
  <div className="card" style={{ width: '18rem' }}>
    <div className="card-body">
      <ul key={index}>
        <li className="card-title">{name}</li>
        <li className="card-text">{quantity}</li>
        <li className="card-text">
          <img
            src={prescription}
            className="card-img-top"
            alt="imagem da receita medica"
          />
        </li>
      </ul>
    </div>
    <div className="card-body">
      <Link to="/" className="card-link">
        Editar
      </Link>
      <Link to="/" className="card-link">
        Excluir
      </Link>
    </div>
  </div>
);

export default class ViewMedicinesRegister extends Component {
  state = {
    messageError: '',
    datasUser: [],
    dataMedicines: [],
  };

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;

    let dados = null;
    try {
      dados = await api.get(`${params.beneficiary_id}/view_register_medicines`);

      if (dados.status === 200) {
        this.setState({ datasUser: dados.data.dados });
        this.setState({ dataMedicines: dados.data.dados.medicinesBeneficiary });
        console.log('Dados do usuario: ', this.state.datasUser);
        console.log('Medicamentos cadastrados:', this.state.dataMedicines);
      }
    } catch (error) {
      if (error.response !== undefined) {
        this.setState({ messageError: error.response.data.messageError });
      } else {
        this.setState({ messageError: 'Nenhum dado encontrado.' });
        console.log('messageError: ', this.state.messageError);
      }
    }
  }

  render() {
    return (
      <div className="space-media">
        {[this.state.datasUser].map((dataUser, index) => (
          <DatasUser
            key={index}
            name={dataUser.name}
            email={dataUser.email}
            phone={dataUser.phone}
            city={dataUser.city}
          />
        ))}

        {this.state.dataMedicines.map((dataMedicine, index) => (
          <DataMedicines
            key={index}
            name={dataMedicine.name}
            quantity={dataMedicine.quantity}
            prescription={dataMedicine.prescription}
          />
        ))}
      </div>
    );
  }
}
