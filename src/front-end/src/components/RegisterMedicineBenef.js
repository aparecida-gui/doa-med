import React, { Component } from 'react';
import api from '../services/api';
import { Redirect } from 'react-router-dom';

class RegisterMedicineBenef extends Component {
  state = {
    name: '',
    quantity: '',
    prescription: null,
    isRegisterMedicineOk: false,
    message: '',
  };

  handleClick = async () => {
    const { match } = this.props;

    const registerMedicineBenef = {
      name: this.state.name,
      quantity: this.state.quantity,
      prescription: this.state.prescription,
    };

    let registerMedicine = null;

    try {
      registerMedicine = await api.post(
        `${match.params.beneficiary_id}/register_medicine_benef`,
        registerMedicineBenef
      );

      this.setState({ isRegisterMedicineOk: true });
    } catch (error) {
      this.setState({ message: registerMedicine.data.message });
    }

    this.setState({ name: '', quantity: '', prescription: null });
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <div style={{ paddingTop: ' 4rem' }} className="row">
          {this.state.isRegisterMedicineOk === true && (
            <div className="alert alert-success" role="alert">
              <h4 className="text-center">
                Medicamento cadastrado com sucesso.
                {
                  <Redirect
                    to={`/${match.params.beneficiary_id}/view_medicine_register`}
                  />
                }
              </h4>
            </div>
          )}
        </div>
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-center">Registrar Medicamento</h2>
          <div className="form-group">
            <label htmlFor="name">Nome do medicamento</label>
            <input
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              required
              type="text"
              className="form-control"
              id="name"
              aria-describedby="nameHelp"
              placeholder="Qual o nome do medicamento?"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantidade</label>
            <input
              value={this.state.quantity}
              onChange={(e) => this.setState({ quantity: e.target.value })}
              required
              type="number"
              className="form-control"
              id="quantity"
              aria-describedby="quantityHelp"
              placeholder="Qual a quantidade do medicamento?"
            />
          </div>
          <div className="form-group">
            <input
              required
              type="file"
              name="name"
              accept=".jpeg, .png, .jpg"
              onChange={(e) =>
                this.setState({ prescription: e.target.files[0] })
              }
              className="custom-file-input"
              id="prescription"
              placeholder="image"
            />
            <label className="custom-file-label" htmlFor="prescription">
              Adicione uma imagem da receita medica
            </label>
          </div>
          <div className="form-group">
            <button
              onClick={this.handleClick}
              type="submit"
              className="btn btn-primary"
            >
              Registrar Medicamento
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterMedicineBenef;
