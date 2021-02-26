import React, { useState } from 'react';
import api from '../services/api';
import LayoutPrivate from '../layouts/LayoutPrivate';
import Button from '../components/Button';
import { Grid, TextField } from '@material-ui/core';
import { ButtonImage, PreviewImage } from '../components/ButtonImage';
import DialogBox from '../components/DialogBox';
import { useAuth } from '../contexts/UserContex';
import { useHistory } from 'react-router-dom';

export default function RegisterMedicineBenef() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [message, setMessage] = useState('');

  let { user } = useAuth();
  let history = useHistory();

  const handleClick = async () => {
    const dataMedicine = {
      name,
      quantity,
      prescription,
    };

    try {
      let registerMedicine = await api.post(
        `register_medicine_benef/${user.id}`,
        dataMedicine
      );

      if (registerMedicine.status === 200 && registerMedicine.data.message) {
        setMessage(registerMedicine.data.message);
      }
      if (registerMedicine.status === 200 && registerMedicine.data) {
        setMessage(
          'O medicamento que você cadastrou já têm disponível para doação.'
        );
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const initialState = () => {
    setName('');
    setQuantity('');
    setPrescription(null);
    setMessage('');
  };

  const onClickButton1 = () => {
    initialState();
  };
  const onClickButton2 = () => {
    history.push(`/view_medicine_register/${user.id}`);
  };

  return (
    <LayoutPrivate>
      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Cadastre o medicamento que você precisa</h2>
          <Grid item>
            <TextField
              autoFocus
              required
              fullWidth
              type="text"
              label="Nome do medicamento"
              placeholder="Qual o nome do medicamento?"
              style={{ margin: 18 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Quantidade do medicamento"
              type="number"
              style={{ margin: 18 }}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Qual a quantidade do medicamento?"
            />
          </Grid>
          <Grid item>
            <ButtonImage
              onChange={(e) =>
                setPrescription(URL.createObjectURL(e.target.files[0]))
              }
            />
          </Grid>
          <Grid item>
            <PreviewImage src={prescription} />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              onClick={handleClick}
              label={'Cadastrar Medicamento'}
            />
          </Grid>
        </form>
      </Grid>
      {message && (
        <DialogBox
          message={message}
          onClickButton1={onClickButton1}
          titleButton1={'Continuar Cadastrando'}
          titleButton2={'Finalizar Cadastro'}
          onClickButton2={onClickButton2}
        />
      )}
    </LayoutPrivate>
  );
}
