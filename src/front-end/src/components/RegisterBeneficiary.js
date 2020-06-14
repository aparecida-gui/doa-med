import React, { Component } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { Redirect } from 'react-router-dom';

class RegisterBeneficiary extends Component {
  state = {
    name: '',
    phone: '',
    city: '',
    email: '',
    password: '',
    isRegisterOk: false,
    message: '',
  };

  handleSubmit = async () => {
    const beneficiario = {
      name: this.state.name,
      phone: this.state.phone,
      city: this.state.city,
      email: this.state.email,
      password: this.state.password,
    };

    let registerBenef = null;

    try {
      registerBenef = await axios.post(
        'http://localhost:7009/beneficiary/register_beneficiary',
        beneficiario
      );

      if (registerBenef.status === 200) {
        this.setState({ isRegisterOk: true });
        localStorage.setItem('api-register', registerBenef.data.id);
        this.getInitialState();
        console.log(registerBenef.data);
      }
    } catch (error) {
      this.setState({ message: 'Não foi possível cadastrar o beneficiario.' });
      this.getInitialState();
      console.log('>>>>>', this.state.message, error);
    }
  };

  getInitialState = () => {
    this.setState({ name: '', phone: '', city: '', email: '', password: '' });
  };

  render() {
    return (
      <div>
        <div style={{ paddingTop: ' 4rem' }} className="row">
          {this.state.isRegisterOk === true && (
            <div className="alert alert-success" role="alert">
              <h4 className="text-center">Seja bem-vindo(a) ao DoaMed</h4>
              {<Redirect exact to="/register_medicine_benef" />}
            </div>
          )}

          {this.state.message !== '' && (
            <div className="alert alert-danger" role="alert">
              <h4 className="text-center">{this.state.message}</h4>
            </div>
          )}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-center">Beneficiario</h1>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              required
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
              required
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
              required
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
              required
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              className="form-control"
              id="password"
              aria-describedby="passwordHelp"
            />
          </div>
          <div className="form-group">
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterBeneficiary;
