import React, { useEffect } from 'react';
import { useAuth } from '../contexts/UserContex';
import { Link } from 'react-router-dom';
import LayoutPrivate from '../layouts/LayoutPrivate';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Home() {
  let { user } = useAuth();

  const addNotification = (value) => {
    notification(value.message);
  };

  const notification = (message) => toast.success(message);

  useEffect(() => {
    async function testeNotification() {
      try {
        let verifyMessage = await api.get(`/have_donation/${user.id}`);
        await addNotification(verifyMessage.data);
      } catch (error) {
        console.log(error);
      }
    }
    testeNotification();
  }, []);

  return (
    <LayoutPrivate>
      <h1>O quê você deseja fazer?</h1>
      <ul>
        <li>
          <Link to={`/medicine_donation/${user.id}`}>Doar Medicamentos</Link>
        </li>
        <li>
          <Link to="/search_medicine">
            Visualizar Medicamentos Disponíveis para Doação
          </Link>
        </li>
        <li>
          <Link to={`/register_medicine/${user.id}`}>
            Cadastrar o medicamento que você precisa
          </Link>
        </li>
        <li>
          <Link to={`/donation_data/${user.id}`}>Doações Agendadas</Link>
        </li>
      </ul>
      <ToastContainer autoClose={9999} />
    </LayoutPrivate>
  );
}
