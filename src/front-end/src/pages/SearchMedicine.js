import React, { useState } from 'react';
import api from '../services/api';
import moment from 'moment';
import LayoutPrivate from '../layouts/LayoutPrivate';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DatasUser from '../components/DatasUser';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 27,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 900,
  },
});

export default function SearchMedicine() {
  const [searchMedicine, setSearchMedicine] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [message, setMessage] = useState('');
  const [donor, setDonor] = useState([]);
  let history = useHistory();

  const handleSubmit = async () => {
    let medicine = await api.get(`medicine/${searchMedicine}`);

    if (medicine.data.message) {
      setMessage(medicine.data.message);
      setMedicines([]);
    } else {
      setMedicines(medicine.data);
      setMessage('');
    }
    getInitialState();
  };

  const getInitialState = () => setSearchMedicine('');

  const classes = useStyles();

  const moreDetails = (object) => {
    setDonor(object);
  };

  const contactDonor = () => history.push('/contact_donor');

  return (
    <LayoutPrivate>
      <Grid container direction="row" justify="center" alignItems="baseline">
        {message.length > 0 && (
          <Alert icon variant="filled" severity="error">
            {message}
          </Alert>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <Typography variant="h5" align="center">
            Medicamentos Disponíveis para Doação
          </Typography>
          <Grid item>
            <TextField
              required
              autoFocus
              fullWidth
              label="Nome do medicamento"
              type="text"
              style={{ margin: 18 }}
              value={searchMedicine}
              onChange={(e) => setSearchMedicine(e.target.value)}
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
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      Medicamento
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Data de Validade
                    </StyledTableCell>
                    <StyledTableCell align="center">Quantidade</StyledTableCell>
                    <StyledTableCell align="center">
                      Laboratório
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Entrar em Contato com Doador
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicines.map((medicine) => (
                    <StyledTableRow key={medicine.id}>
                      <StyledTableCell align="center">
                        {medicine.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {moment(medicine.expirationDate).format('DD/MM/YYYY')}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {medicine.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {medicine.laboratory}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          onClick={() => moreDetails(medicine.donors)}
                        >
                          + Detalhes
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
        <Grid item>
          {donor.length > 0 &&
            donor.map((donorData) => (
              <DatasUser
                key={donorData.id}
                name={donorData.name}
                city={donorData.city}
                email={donorData.email}
                title={'Dados do Doador'}
                labelButton={'Contatar Doador'}
                onClick={contactDonor}
              />
            ))}
        </Grid>
      </Grid>
    </LayoutPrivate>
  );
}
