import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLogin: false,
    message: '',
  };

  handleSubmit = async () => {
    const login = {
      email: this.state.email,
      password: this.state.password,
    };

    let acessoLogin = null;

    try {
      acessoLogin = await axios.post('http://localhost:7009/login', login);

      if (acessoLogin.status === 200) {
        this.setState({ isLogin: true });
        localStorage.setItem('api-login', acessoLogin.data.id);
        console.log('>>>> acessoLogin:', acessoLogin.data);
      }
    } catch (error) {
      this.setState({ message: 'Usuário não existe' });
      this.setState({ email: '', password: '' });
      console.log('>>>>', this.state.message, error);
    }
  };

  render() {
    return (
      <div>
        <div style={{ paddingTop: ' 4rem' }} className="row">
          {this.state.isLogin === true && (
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
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-center">Login</h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              required
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Digite seu email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Senha</label>
            <input
              required
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="form-group">
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Logar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
