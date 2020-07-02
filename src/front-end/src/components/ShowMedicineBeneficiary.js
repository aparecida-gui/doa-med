import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ShowMedicineBeneficiary extends Component {
  state = { beneficiarys: [] };

  async componentDidMount() {
    let dataBeneficiarys = await axios.get(
      'http://localhost:7009/beneficiary/show_beneficiary'
    );

    if (dataBeneficiarys) {
      this.setState({
        beneficiarys: dataBeneficiarys.data,
      });
      console.log('>>>>>>', this.state.beneficiarys);
      console.log('>>>>>>>', this.state.beneficiarys.medicinesBeneficiary);
    }
  }
  render() {
    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          {this.state.beneficiarys.map((beneficiary) => (
            <div key={beneficiary.id}>
              <h5 className="card-title">Nome {beneficiary.name}</h5>
              <p className="card-text">Telefone: {beneficiary.phone}</p>
              <p className="card-text">Email: {beneficiary.email}</p>
              <p className="card-text">Cidade: {beneficiary.city}</p>
              <div>
                {beneficiary.medicinesBeneficiary.map((medicine) => (
                  <div key={medicine.id}>
                    <p className="card-text">Medicamento {medicine.name}</p>
                    <p className="card-text">Quantidade {medicine.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Link to="/" className="btn btn-primary">
            Solicitação
          </Link>
        </div>
      </div>
    );
  }
}

export default ShowMedicineBeneficiary;
