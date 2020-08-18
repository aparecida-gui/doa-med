import React, { Component } from 'react';
import api from '../services/api';
import InputMask from 'react-input-mask';
import { Redirect } from 'react-router-dom';

class RegisterBeneficiary extends Component {
  state = {
    name: '',
    phone: '',
    city: '',
    email: '',
    password: '',
    isRegisterOk: null,
    message: '',
  };

  handleSubmit = async () => {
    const user = {
      name: this.state.name,
      phone: this.state.phone,
      city: this.state.city,
      email: this.state.email,
      password: this.state.password,
    };

    const { name, phone, city, email, password } = user;

    let registerUser = null;

    try {
      registerUser = await api.post('/register_user', {
        name,
        phone,
        city,
        email,
        password,
      });

      if (registerUser.status === 201) {
        this.setState({
          isRegisterOk: true,
        });
      }
    } catch (error) {
      if (error.response.data.isUserExit.message) {
        this.setState({
          isRegisterOk: false,
          message: error.response.data.isUserExit.message,
        });
        this.getInitialState();
      }
      if (error.response.data.validData.message) {
        this.setState({
          isRegisterOk: false,
          message: error.response.data.validData.message,
        });
      }
      console.log(this.state.message);
    }
  };

  getInitialState = () => {
    this.setState({
      name: '',
      phone: '',
      city: '',
      email: '',
      password: '',
    });
  };

  render() {
    return (
      <div>
        <div style={{ paddingTop: ' 4rem' }} className="row">
          {this.state.isRegisterOk === true && (
            <div className="alert alert-success" role="alert">
              {<Redirect exact to="/register_medicine_benef" />}
            </div>
          )}
          {this.state.isRegisterOk === false && (
            <div className="alert alert-danger" role="alert">
              <h4 className="text-center">{this.state.message}</h4>
            </div>
          )}
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <h1 className="text-center">Cadastro</h1>
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
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterBeneficiary;
