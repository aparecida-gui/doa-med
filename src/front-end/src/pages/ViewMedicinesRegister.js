import React, { useEffect, useState } from 'react';
import api from '../services/api';
import DatasUser from '../components/DatasUser';
import DataMedicines from '../components/DataMedicines';
import LayoutPrivate from '../layouts/LayoutPrivate';
import { useAuth } from '../contexts/UserContex';

export default function ViewMedicinesRegister() {
  const [messageError, setMessageError] = useState('');
  const [message, setMessage] = useState('');
  const [datasUser, setDatasUser] = useState([]);
  const [dataMedicines, setDataMedicines] = useState([]);

  let { user } = useAuth();

  const handeler = async () => {
    let dados = await api.get(`view_register_medicines/${user.id}`);

    try {
      if (dados.status === 200 && dados.data.dados) {
        setDatasUser(dados.data.dados);
        setDataMedicines(dados.data.dados.medicinesBeneficiary);
      } else {
        setDatasUser(dados.data.user);
        setMessage(dados.data.message);
      }
    } catch (error) {
      if (error.response !== undefined) {
        setMessageError(error.response.data.messageError);
      }
    }
  };

  useEffect(() => {
    handeler();
  }, []);

  return (
    <LayoutPrivate>
      {[datasUser].map((dataUser, index) => (
        <DatasUser
          key={index}
          name={dataUser.name}
          email={dataUser.email}
          phone={dataUser.phone}
          city={dataUser.city}
        />
      ))}

      {message === '' ? (
        dataMedicines.map((dataMedicine, index) => (
          <DataMedicines
            key={index}
            name={dataMedicine.name}
            quantity={dataMedicine.quantity}
            prescription={dataMedicine.prescription}
            id={dataMedicine.id}
          />
        ))
      ) : (
        <div>
          <h4>{message}</h4>
        </div>
      )}
    </LayoutPrivate>
  );
}
