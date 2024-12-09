import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email es requerido'),
  name: yup.string().required('Nombre es requerido'),
});

const AddRecipient = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      await api.post('/recipients/', data);
      alert('Recipient agregado exitosamente');
      reset();
      navigate('/recipients');
    } catch (error) {
      console.error('Error adding recipient:', error);
      alert('Error al agregar el recipient');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Agregar Recipient</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            {...register('name')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    </div>
  );
};

export default AddRecipient;