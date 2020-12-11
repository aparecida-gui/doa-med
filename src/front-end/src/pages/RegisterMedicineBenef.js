import React, { Component } from 'react';
import api from '../services/api';
import { Redirect } from 'react-router-dom';
import LayoutPrivate from '../layouts/LayoutPrivate';
import Button from '../components/Button';
import { Grid, TextField } from '@material-ui/core';
import { ButtonImage, PreviewImage } from '../components/ButtonImage';

class RegisterMedicineBenef extends Component {
  state = {
    name: '',
    quantity: '',
    prescription: null,
    isRegisterMedicineOk: false,
    message: '',
  };

  handleClick = async (e) => {
    const { match } = this.props;

    const registerMedicineBenef = {
      name: this.state.name,
      quantity: this.state.quantity,
      prescription: this.state.prescription,
    };

    let registerMedicine = null;

    console.log('>>>>> registerMedicineBenef:', registerMedicineBenef);
    console.log(this.state.prescription);

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
      <LayoutPrivate>
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
        <Grid container direction="column" justify="center" alignItems="center">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>Cadastre o medicamento que você precisa</h2>
            <Grid item>
              <TextField
                required
                autoFocus
                fullWidth
                type="text"
                label="Nome do medicamento"
                placeholder="Qual o nome do medicamento?"
                style={{ margin: 18 }}
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                fullWidth
                label="Quantidade do medicamento"
                type="number"
                style={{ margin: 18 }}
                value={this.state.quantity}
                onChange={(e) => this.setState({ quantity: e.target.value })}
                placeholder="Qual a quantidade do medicamento?"
              />
            </Grid>
            <Grid item>
              <ButtonImage
                onChange={(e) =>
                  this.setState({
                    prescription: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </Grid>
            <Grid item>
              {this.state.files !== null && (
                <PreviewImage src={this.state.prescription} />
              )}
            </Grid>
            <Grid item>
              <Button
                onClick={this.handleClick}
                label={'Cadastrar Medicamento'}
              />
            </Grid>
          </form>
        </Grid>
      </LayoutPrivate>
    );
  }
}

export default RegisterMedicineBenef;
