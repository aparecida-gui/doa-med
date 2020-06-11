import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = async () => {
    const login = {
      email: this.state.email,
      password: this.state.password,
    };

    const acessoLogin = await axios.post('http://localhost:7009/login', login);

    if (acessoLogin.status === 200) {
      console.log(acessoLogin.data);
    }
  };

  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Senha</label>
          <input
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button
          onClick={this.handleSubmit}
          type="submit"
          className="btn btn-outline-success"
        >
          Logar
        </button>
      </form>
    );
  }
}

export default Login;
