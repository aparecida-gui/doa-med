import React, { Component } from 'react';
import axios from 'axios';

class RegisterMedicineBenef extends Component {
  state = {
    name: '',
    quantity: '',
    photo: null,
  };

  handlerClick = async () => {
    const formData = new FormData();
    const beneficiary_id = 16;
    const medicine_beneficiary_id = 29;

    formData.append('name', this.state.photo);

    const registerMedicineBenef = {
      name: this.state.name,
      quantity: this.state.quantity,
    };

    console.log('>>>>>> registerMedicineBenef: ', registerMedicineBenef);

    const registerMedicine = await axios.post(
      `http://localhost:7009/medicine/${beneficiary_id}/register_medicine_benef`,
      registerMedicineBenef
    );

    const registerPhoto = await axios.post(
      `http://localhost:7009/medicine/${medicine_beneficiary_id}/photo`,
      formData
    );

    console.log('>>>>>> register: ', registerMedicine.data);
    console.log('>>>>>> registerPhoto:', registerPhoto);
  };
  render() {
    return (
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
            onClick={this.handlerClick}
            type="submit"
            className="btn btn-primary"
          >
            Registrar Medicamento
          </button>
        </div>
        {console.log(this.state.photo)}
      </form>
    );
  }
}

export default RegisterMedicineBenef;
