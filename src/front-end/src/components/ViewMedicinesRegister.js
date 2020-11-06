import React, { Component, Fragment } from 'react';
import api from '../services/api';
import DatasUser from '../components/DatasUser';
import DataMedicines from '../components/DataMedicines';

class ViewMedicinesRegister extends Component {
  state = {
    messageError: '',
    message: '',
    datasUser: [],
    dataMedicines: [],
  };

  handeler = async () => {
    let {
      match: { params },
    } = this.props;

    let dados = await api.get(
      `${params.beneficiary_id}/view_register_medicines`
    );

    try {
      if (dados.status === 200 && dados.data.dados) {
        this.setState({
          datasUser: dados.data.dados,
          dataMedicines: dados.data.dados.medicinesBeneficiary,
        });
      } else {
        this.setState({
          datasUser: dados.data.user,
          message: dados.data.message,
        });
        console.log('dataUser: ', this.state.dataUser, this.state.message);
      }
    } catch (error) {
      if (error.response !== undefined) {
        this.setState({ messageError: error.response.data.messageError });
      }
    }
  };

  componentDidMount() {
    this.handeler();
  }

  render() {
    return (
      <Fragment>
        {[this.state.datasUser].map((dataUser, index) => (
          <DatasUser
            key={index}
            name={dataUser.name}
            email={dataUser.email}
            phone={dataUser.phone}
            city={dataUser.city}
          />
        ))}

        {this.state.message === '' ? (
          this.state.dataMedicines.map((dataMedicine, index) => (
            <DataMedicines
              key={index}
              name={dataMedicine.name}
              quantity={dataMedicine.quantity}
              prescription={dataMedicine.prescription}
              id={dataMedicine.id}
            />
          ))
        ) : (
          <div className="text-center text-primary px-4">
            <h4>{this.state.message}</h4>
          </div>
        )}
      </Fragment>
    );
  }
}

export default ViewMedicinesRegister;
