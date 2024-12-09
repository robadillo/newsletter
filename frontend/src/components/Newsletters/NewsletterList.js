import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const NewsletterList = () => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    api.get('/newsletter/')
      .then(response => setNewsletters(response.data))
      .catch(error => console.error('Error fetching newsletters:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Newsletters</h2>
      <Link to="/newsletters/upload" className="btn btn-primary mb-3">Subir Newsletter</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Key</th>
            <th>Contenido</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {newsletters.map(n => (
            <tr key={n.id}>
              <td>{n.key}</td>
              <td>{n.content}</td>
              <td>{new Date(n.created_at).toLocaleString()}</td>
              <td>
                <Link to={`/newsletters/send/${n.key}`} className="btn btn-success btn-sm mr-2">Enviar</Link>
                <Link to={`/newsletters/${n.key}`} className="btn btn-info btn-sm">Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsletterList;