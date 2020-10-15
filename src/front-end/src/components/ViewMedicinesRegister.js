import React, { Component } from 'react';
import api from '../services/api';
import DatasUser from '../components/DatasUser';
import DataMedicines from '../components/DataMedicines';

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
        this.setState({
          datasUser: dados.data.dados,
          dataMedicines: dados.data.dados.medicinesBeneficiary,
        });
      }
    } catch (error) {
      if (error.response !== undefined) {
        this.setState({ messageError: error.response.data.messageError });
      } else {
        this.setState({
          messageError: 'Erro de conexão tente atualizar a página.',
        });
        console.log('messageError: ', this.state.messageError);
      }
    }
  }

  render() {
    return (
      <div>
        {[this.state.datasUser].map((dataUser, index) => (
          <DatasUser
            key={index}
            name={dataUser.name}
            email={dataUser.email}
            phone={dataUser.phone}
            city={dataUser.city}
          />
        ))}

        <h3>Seus Medicamentos</h3>
        {this.state.dataMedicines.map((dataMedicine, index) => (
          <DataMedicines
            key={index}
            name={dataMedicine.name}
            quantity={dataMedicine.quantity}
            prescription={dataMedicine.prescription}
            Link={dataMedicine.id}
          />
        ))}
      </div>
    );
  }
}
