import React, { Component } from 'react';
import axios from 'axios';

class RegisterMedicineBenef extends Component {
  state = {
    name: '',
    quantity: '',
    photo: null,
    isRegisterMedicineOk: false,
    message: '',
  };

  handleClick = async () => {
    const beneficiary_id = localStorage.getItem('api-register');

    const registerMedicineBenef = {
      name: this.state.name,
      quantity: this.state.quantity,
    };

    let registerMedicine = null;

    try {
      registerMedicine = await axios.post(
        `http://localhost:7009/medicine/${beneficiary_id}/register_medicine_benef`,
        registerMedicineBenef
      );

      if (registerMedicine.status === 200) {
        this.registerPhoto();
      }
    } catch (error) {
      this.setState({ message: registerMedicine.data.message });
    }
  };

  registerPhoto = async () => {
    const formData = new FormData();

    const medicine_beneficiary_id = localStorage.getItem('api-register');

    if (medicine_beneficiary_id) {
      formData.append('name', this.state.photo);

      const register = await axios.post(
        `http://localhost:7009/medicine/${medicine_beneficiary_id}/photo`,
        formData
      );
      this.setState({
        isRegisterMedicineOk: true,
      });
      console.log(register.data.message);
    } else {
      this.setState({ message: 'Não foi possivel registrar a foto.' });
    }
  };
  render() {
    return (
      <div>
        <div style={{ paddingTop: ' 4rem' }} className="row">
          {this.state.isRegisterMedicineOk === true && (
            <div className="alert alert-success" role="alert">
              <h4 className="text-center">
                Medicamento cadastrado com sucesso.
              </h4>
            </div>
          )}
          {this.state.message !== '' && (
            <div className="alert alert-danger" role="alert">
              <h4 className="text-center">{this.state.message}</h4>
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
              onChange={(e) => this.setState({ photo: e.target.files[0] })}
              className="custom-file-input"
              id="photo"
              placeholder="image"
            />
            <label className="custom-file-label" htmlFor="photo">
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
          {console.log(this.state.photo)}
        </form>
      </div>
    );
  }
}

export default RegisterMedicineBenef;
