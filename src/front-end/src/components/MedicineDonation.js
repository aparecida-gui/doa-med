import React, { Component } from 'react';
import api from '../services/api';

export default class MedicineDonation extends Component {
  state = {
    name: '',
    laboratory: '',
    quantity: '',
    expirationDate: '',
    successMessage: '',
    errorMessage: '',
  };

  handleClick = async () => {
    const dataMedicineDonation = {
      name: this.state.name,
      laboratory: this.state.laboratory,
      quantity: this.state.quantity,
      expirationDate: this.state.expirationDate,
    };

    try {
      const registerMedicineDonantion = await api.post(
        '/medicine/register_medicine',
        dataMedicineDonation
      );
      if (registerMedicineDonantion.status === 201) {
        this.setState({
          successMessage: registerMedicineDonantion.data.message,
        });
      }
    } catch (error) {
      this.setState({ errorMessage: error.response.data.error });
    }
  };
  render() {
    return (
      <div>
        {this.state.successMessage !== '' && (
          <div className="alert alert-success" role="alert">
            <h4 className="text-center">{this.state.successMessage}</h4>
          </div>
        )}
        {this.state.errorMessage !== '' && (
          <div className="alert alert-danger" role="alert">
            <h4 className="text-center">{this.state.errorMessage}</h4>
          </div>
        )}
        <h2 className="text-center">Cadastrar Medicamento para Doação</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Nome do Medicamento</label>
            <input
              autoFocus
              required
              type="text"
              id="name"
              className="form-control"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="Digite o nome do medicamento"
            />
          </div>
          <div className="form-group">
            <label htmlFor="laboratory">Laboratório</label>
            <input
              required
              type="text"
              id="laboratory"
              className="form-control"
              value={this.state.laboratory}
              onChange={(e) => this.setState({ laboratory: e.target.value })}
              placeholder="Digite o nome do laboratório"
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantidade Disponível para Doação</label>
            <input
              required
              type="number"
              id="quantity"
              className="form-control"
              value={this.state.quantity}
              onChange={(e) => this.setState({ quantity: e.target.value })}
              placeholder="Digite a quantidade do medicamento"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expirationDate">Data de Validade</label>
            <input
              required
              type="date"
              id="expirationDate"
              value={this.state.expirationDate}
              onChange={(e) =>
                this.setState({ expirationDate: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              onClick={this.handleClick}
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
