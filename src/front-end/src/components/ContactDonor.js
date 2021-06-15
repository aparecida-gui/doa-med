import React, { useState } from 'react';
import '../index.css';
import LayoutPrivate from '../layouts/LayoutPrivate';
import { Grid, TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/UserContex';
import { DonorData } from '../contexts/DonorContex';
import api from '../services/api';
import DialogBox from '../components/DialogBox';
import { useHistory } from 'react-router-dom';

export default function ContactDonor() {
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [messageNotification, setMessageNotification] = useState('');
  let { user } = useAuth();
  let { donor1 } = DonorData();
  let history = useHistory();

  const sendData = async () => {
    const nameBeneficiary = user.name;
    const idBeneficiary = user.id;
    const nameDonor = donor1[0].donors[0].name;
    const idDonor = donor1[0].donors[0].id;
    const idMedicine = donor1[0].id;
    const nameMedicine = donor1[0].name;
    const quantityDonate = donor1[0].quantity;

    const donorMedicine = {
      idDonor,
      idMedicine,
    };

    try {
      let idDonorMedicine = await api.post('/medicine_donor', donorMedicine);
      idDonorMedicine = await idDonorMedicine.data.dataDonorMedicine[0].id;

      const dataMessage = {
        idDonorMedicine,
        idBeneficiary,
        message,
        address,
        nameMedicine,
        quantityDonate,
        date,
        time,
      };

      const sendNotificationDonor = await api.post(
        `/contact_donor/notification/${donor1[0].id}`,
        dataMessage
      );
      if (sendNotificationDonor.status === 201) {
        setMessageNotification(sendNotificationDonor.data.successMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickButton1 = () => history.push(`/home`);

  return (
    <LayoutPrivate>
      <Grid container direction="column" justify="center" alignItems="center">
        <Alert variant="filled" severity="warning" style={{ marginBottom: 18 }}>
          Atenção: Para sua Segurança sempre escolha um local Público para
          Doação.
        </Alert>

        <form onSubmit={(e) => e.preventDefault()} className="main">
          <h2>Agendar Doação</h2>
          <Grid item>
            <TextField
              disabled
              required
              fullWidth
              type="text"
              placeholder="Nome do Beneficiário"
              label="Beneficiário"
              style={{ margin: 18 }}
              value={user.name}
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              required
              fullWidth
              type="text"
              placeholder="Nome do Doador"
              label="Doador"
              value={donor1[0].donors[0].name}
              style={{ margin: 18 }}
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              required
              fullWidth
              autoFocus
              type="text"
              placeholder="Medicamento Doado"
              label="Medicamento Doado"
              value={donor1[0].name}
              style={{ margin: 18 }}
            />
          </Grid>
          <Grid item>
            <TextField
              disabled
              required
              fullWidth
              type="number"
              placeholder="Quantidade Doada"
              label="Quantidade Doada"
              value={donor1[0].quantity}
              style={{ margin: 18 }}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              multiline
              autoFocus
              label="Mensagem"
              type="text"
              variant="outlined"
              style={{ margin: 18 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              label="Local da Doação"
              placeholder="Aconselha-se sempre um local Público"
              style={{ margin: 18 }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              type="time"
              label="Hora"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ margin: 40 }}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              required
              label="Data"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ margin: 40 }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              type="submit"
              style={{ margin: 14 }}
              onClick={sendData}
            >
              Enviar
            </Button>
          </Grid>
        </form>
        {messageNotification && (
          <DialogBox
            message={messageNotification}
            onClickButton1={onClickButton1}
            titleButton1={'OK'}
          />
        )}
      </Grid>
    </LayoutPrivate>
  );
}
