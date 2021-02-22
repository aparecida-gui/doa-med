import React, { useState } from 'react';
import '../index.css';
import { Button, Grid, TextField } from '@material-ui/core';
import api from '../services/api';
import { useAuth } from '../contexts/UserContex';
import LayoutPrivate from '../layouts/LayoutPrivate';
import DialogBox from '../components/DialogBox';
import { useHistory } from 'react-router-dom';

export default function MedicineDonation() {
  const [name, setName] = useState('');
  const [laboratory, setLaboratory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let { user } = useAuth();
  let history = useHistory();

  const handleClick = async () => {
    const dataMedicineDonation = {
      name,
      laboratory,
      quantity,
      expirationDate,
    };

    let registerMedicineDonantion = null;
    try {
      registerMedicineDonantion = await api.post(
        `register_medicine/donor/${user.id}`,
        dataMedicineDonation
      );
      if (registerMedicineDonantion.status === 200) {
        setSuccessMessage(registerMedicineDonantion.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };
  const initialState = () => {
    setName('');
    setLaboratory('');
    setQuantity('');
    setExpirationDate('');
    setErrorMessage('');
    setSuccessMessage('');
  };
  const onClickButton1 = () => initialState();
  const onClickButton2 = () => history.push(`/home`);

  return (
    <LayoutPrivate>
      {errorMessage !== '' && (
        <div>
          <h4>{errorMessage}</h4>
        </div>
      )}
      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Cadastrar Medicamento para Doação</h2>
          <Grid item>
            <TextField
              autoFocus
              required
              fullWidth
              label="Nome do Medicamento"
              type="text"
              value={name}
              style={{ margin: 18 }}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do medicamento"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Laboratório"
              type="text"
              value={laboratory}
              style={{ margin: 18 }}
              onChange={(e) => setLaboratory(e.target.value)}
              placeholder="Digite o nome do laboratório"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              type="number"
              label="Quantidade"
              value={quantity}
              style={{ margin: 18 }}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Digite a quantidade do medicamento"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              type="date"
              label="Data de Validade"
              value={expirationDate}
              style={{ margin: 18 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              type="submit"
              onClick={handleClick}
            >
              Registrar Medicamento
            </Button>
          </Grid>
        </form>
        {successMessage && (
          <DialogBox
            message={successMessage}
            onClickButton1={onClickButton1}
            titleButton1={'Continuar Cadastrando'}
            titleButton2={'Finalizar Cadastro'}
            onClickButton2={onClickButton2}
          />
        )}
      </Grid>
    </LayoutPrivate>
  );
}
