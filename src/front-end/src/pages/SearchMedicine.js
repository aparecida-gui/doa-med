import React, { useState } from 'react';
import api from '../services/api';
import moment from 'moment';
import LayoutPrivate from '../layouts/LayoutPrivate';
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TextField,
} from '@material-ui/core';
import Button from '../components/Button';

export default function SearchMedicine() {
  const [searchMedicine, setSearchMedicine] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    let medicine = await api.get(`medicine/${searchMedicine}`);

    console.log(medicine);

    if (medicine.data.message) {
      setMessage(medicine.data.message);
      setMedicines([]);
    } else {
      setMedicines(medicine.data.medicine);
      setMessage('');
    }

    getInitialState();
  };

  const getInitialState = () => {
    setSearchMedicine('');
  };

  return (
    <LayoutPrivate>
      <Grid container direction="column" justify="center" alignItems="center">
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item>
            <TextField
              autoFocus
              required
              fullWidth
              type="text"
              label="Nome do medicamento"
              placeholder="Qual o nome do medicamento?"
              value={searchMedicine}
              onChange={(e) => setSearchMedicine(e.target.value)}
              style={{ margin: 18 }}
            />
          </Grid>
          <Grid item>
            {searchMedicine.length > 0 && (
              <Button
                type="submit"
                onClick={handleSubmit}
                label={'Pesquisar'}
              />
            )}
          </Grid>
        </form>

        <Grid item>
          {medicines.length > 0 && (
            <div>
              <h4>Medicamentos Disponiveis para Doação</h4>
              <TableContainer></TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <th>Medicamento</th>
                    <th>Data de Validade</th>
                    <th>Quantidade</th>
                    <th>Laboratório</th>
                  </TableRow>
                </TableHead>
                {medicines.map((medicine) => (
                  <TableBody key={medicine.id}>
                    <tr>
                      <TableCell>{medicine.name}</TableCell>
                      <TableCell>
                        {moment(medicine.expirationDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{medicine.quantity}</TableCell>
                      <TableCell>{medicine.laboratory}</TableCell>
                    </tr>
                  </TableBody>
                ))}
              </Table>
            </div>
          )}
          <div>{message.length > 0 && <h4>{message}</h4>}</div>
        </Grid>
      </Grid>
    </LayoutPrivate>
  );
}
