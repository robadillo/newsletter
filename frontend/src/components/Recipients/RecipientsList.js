import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const RecipientList = () => {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    api.get('/recipients/')
      .then(response => setRecipients(response.data))
      .catch(error => console.error('Error fetching recipients:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Recipients</h2>
      <Link to="/recipients/add" className="btn btn-primary mb-3">Agregar Recipient</Link>
      <Link to="/recipients/bulk-add" className="btn btn-secondary mb-3 ml-2">Carga Masiva</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Nombre</th>
            <th>Suscrito</th>
            <th>Fecha de Creación</th>
            <th>Suscripciones</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(r => (
            <tr key={r.id}>
              <td>{r.email}</td>
              <td>{r.name}</td>
              <td>{r.is_subscribed ? 'Sí' : 'No'}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>{'hola'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipientList;