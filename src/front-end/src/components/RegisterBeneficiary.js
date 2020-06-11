import React, { Component } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

class RegisterBeneficiary extends Component {
  state = {
    name: '',
    phone: React.createRef(),
    city: '',
    email: '',
    beneficiarioRegister: false,
  };

  handleSubmit = async () => {
    const beneficiario = {
      name: this.state.name,
      phone: this.state.phone,
      city: this.state.city,
      email: this.state.email,
    };

    const registerBenef = await axios.post(
      'http://localhost:7009/beneficiary/register_beneficiary',
      beneficiario
    );

    if (registerBenef.status === 200) {
      this.setState({ beneficiarioRegister: true });
    }
  };

  render() {
    return (
      <div>
        <div style={{ paddingTop: ' 4rem' }} className="row">
          {this.state.beneficiarioRegister === true && (
            <div className="alert alert-success" role="alert">
              <h4>Beneficiario cadastrado com sucesso.</h4>
              Acesse a página <Link to="/">Login</Link>
            </div>
          )}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-center">Beneficiario</h1>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              type="text"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone</label>
            <InputMask
              mask="(99) 99999-9999"
              onChange={(e) => this.setState({ phone: e.target.value })}
              value={this.state.phone}
              type="tel"
              id="phone"
              placeholder="Ex.: (00) 0000-0000"
              className="form-control"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">Cidade</label>
            <input
              value={this.state.city}
              onChange={(e) => this.setState({ city: e.target.value })}
              type="text"
              className="form-control"
              id="city"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="btn btn-outline-success"
          >
            Registrar
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterBeneficiary;
