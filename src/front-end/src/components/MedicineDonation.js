import React, { useState } from 'react';
import '../index.css';
import { Button, Grid, TextField } from '@material-ui/core';
import api from '../services/api';
import { useAuth } from '../contexts/UserContex';

export default function MedicineDonation() {
  const [name, setName] = useState('');
  const [laboratory, setLaboratory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let { user } = useAuth();

  const handleClick = async () => {
    const dataMedicineDonation = {
      name,
      laboratory,
      quantity,
      expirationDate,
    };

    try {
      let registerMedicineDonantion = await api.post(
        `register_medicine/donor/${user.id}`,
        dataMedicineDonation
      );
      if (registerMedicineDonantion.status === 201) {
        setSuccessMessage(registerMedicineDonantion.data.message);
        console.log('>>>>>>...', dataMedicineDonation);
      }
    } catch (error) {
      setErrorMessage(error.response.data.error);
      console.log('>>>>>>...', errorMessage);
    }
  };
  return (
    <div>
      {successMessage !== '' && (
        <div>
          <h4>{successMessage}</h4>
        </div>
      )}
      {errorMessage !== '' && (
        <div>
          <h4>{errorMessage}</h4>
        </div>
      )}
      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()} className="main register">
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
              value={expirationDate}
              style={{ margin: 18 }}
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
      </Grid>
    </div>
  );
}
