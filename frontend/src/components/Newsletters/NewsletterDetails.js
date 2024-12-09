import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const NewsletterDetails = () => {
  const { key } = useParams();
  const [newsletter, setNewsletter] = useState(null);

  useEffect(() => {
    api.get(`/newsletter/${key}`)
      .then(response => setNewsletter(response.data))
      .catch(error => console.error('Error fetching newsletter details:', error));
  }, [key]);

  if (!newsletter) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <h2>Detalles del Newsletter: {newsletter.key}</h2>
      <p><strong>Contenido:</strong> {newsletter.content}</p>
      <p><strong>Fecha de Creación:</strong> {new Date(newsletter.created_at).toLocaleString()}</p>
      {/* Omitir el archivo binario */}
    </div>
  );
};

export default NewsletterDetails;