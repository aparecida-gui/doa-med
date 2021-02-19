import React from 'react';
import { useAuth } from '../contexts/UserContex';
import { Link } from 'react-router-dom';
import LayoutPrivate from '../layouts/LayoutPrivate';

export default function Home() {
  let { user } = useAuth();
  return (
    <LayoutPrivate>
      <h1>O quê você deseja fazer?</h1>
      <ul>
        <li>
          <Link to={`/medicine_donation/${user.id}`}>Doar Medicamentos</Link>
        </li>
        <li>
          <Link to="/search_medicine">
            Visualizar Medicamentos Disponiveis para Doação
          </Link>
        </li>
        <li>
          <Link to={`/register_medicine/${user.id}`}>
            Adicionar medicamentos que você precisa
          </Link>
        </li>
      </ul>
    </LayoutPrivate>
  );
}
