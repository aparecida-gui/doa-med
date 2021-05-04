import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../contexts/UserContex';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default function RecipeReviewCard() {
  const [donationScheduled, setDonationScheduled] = useState([]);
  const [message, setMessage] = useState('');
  let { user } = useAuth();

  const getDonations = async () => {
    try {
      let getData = await api.get(`/check_donation/${user.id}`);
      console.log('getData: ', getData.data.medicinesScheduledDonation);

      if (getData.status === 200) {
        setDonationScheduled(getData.data.medicinesScheduledDonation);
      } else {
        setMessage(getData.data);
      }
    } catch (error) {
      if (error.response === undefined) {
        setMessage('Servidor não está disponível.');
        console.log(message);
      }
    }
  };

  return (
    <Paper elevation={8} style={{ marginTop: 30 }}>
      <div style={{ margin: 15, padding: 10 }}>
        <Typography variant="h5">Nome do medicamento</Typography>
        <Typography variant="subtitle1">Hoje</Typography>
        <Typography variant="body1">Quantidade</Typography>
        <Typography variant="body1">Data</Typography>
        <Typography variant="body1">Hora</Typography>
        <div style={{ marginTop: 7, paddingTop: 14 }}>
          <Typography variant="subtitle1">
            Este medicamento foi doado?
          </Typography>
          <div style={{ marginBottom: 8, paddingBottom: 16 }}>
            <button>Sim</button>
            <button>Não</button>
          </div>
        </div>
      </div>
    </Paper>
  );
}
