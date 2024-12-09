import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  send_at: yup.date().required('Fecha y hora son requeridas').min(new Date(), 'Debe ser una fecha futura'),
});

const SendNewsletter = () => {
  const { key } = useParams();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      await api.post('/newsletter/send', { key });
      alert('Newsletter enviado exitosamente');
      navigate('/newsletters');
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('Error al enviar el newsletter');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Enviar Newsletter: {key}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="send_at">Enviar en Fecha y Hora</label>
          <input
            type="datetime-local"
            name="send_at"
            ref={register}
            className={`form-control ${errors.send_at ? 'is-invalid' : ''}`}
          />
          {errors.send_at && <div className="invalid-feedback">{errors.send_at.message}</div>}
        </div>
        <button type="submit" className="btn btn-success">Enviar Ahora</button>
      </form>
    </div>
  );
};

export default SendNewsletter;