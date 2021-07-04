import React, { useState } from 'react';
import '../index.css';
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
import { DonorData } from '../contexts/DonorContex';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 22,
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
  let { donor1, setDonor1 } = DonorData();

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

  const moreDetails = (donorSelect, medineDonor) => {
    let dataMedicineAndDonor = [];
    dataMedicineAndDonor.push(medineDonor);

    setDonor(donorSelect);
    setDonor1(dataMedicineAndDonor);
  };

  const contactDonor = () =>
    history.push(`/contact_donor/${donor1[0].donors[0].id}`);

  return (
    <LayoutPrivate>
      <Grid container direction="column" justify="center" alignItems="center">
        {message.length > 0 && (
          <Alert icon variant="filled" severity="error">
            {message}
          </Alert>
        )}
        <form onSubmit={(e) => e.preventDefault()} className="main">
          <Typography variant="h5" align="center">
            Consulte aqui o Medicamento que você Precisa
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
                    <StyledTableCell align="center">
                      Quantidade para Doar
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Laboratório
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Status do Medicamento
                    </StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </TableRow>
                </TableHead>
                {medicines.map((medicine) => (
                  <TableBody key={medicine.id}>
                    <StyledTableRow>
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
                      {medicine.status === false ? (
                        <React.Fragment>
                          <StyledTableCell align="center">
                            Doação Agendada
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              disabled
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                moreDetails(medicine.donors, medicine)
                              }
                            >
                              Entre em contato com o Doador
                            </Button>
                          </StyledTableCell>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <StyledTableCell align="center">
                            Disponível para Doação
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() =>
                                moreDetails(medicine.donors, medicine)
                              }
                            >
                              Entre em contato com o Doador
                            </Button>
                          </StyledTableCell>
                        </React.Fragment>
                      )}
                    </StyledTableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          )}
          <Grid item>
            {donor.length > 0 &&
              donor.map((donorData) => (
                <DatasUser
                  key={donorData.id}
                  name={donorData.name}
                  city={donorData.city}
                  title={'Dados do Doador '}
                  labelButton={'Click aqui para marcar o local da Doação'}
                  onClick={contactDonor}
                />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </LayoutPrivate>
  );
}
