import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  key: yup.string().required('Key es requerida'),
  content: yup.string().required('Contenido es requerido'),
  file: yup
    .mixed()
    .required('Archivo es requerido')
    .test('fileType', 'Solo se permiten PDF o PNG', value => {
      return value && (value.type === 'application/pdf' || value.type === 'image/png');
    }),
});

const NewsletterUpload = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      formData.append('key', data.key);
      formData.append('content', data.content);
      formData.append('file', data.file);

      await api.post('/newsletter/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Newsletter subido exitosamente');
      reset();
      navigate('/newsletters');
    } catch (error) {
      console.error('Error uploading newsletter:', error);
      alert('Error al subir el newsletter');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Subir Newsletter</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="key">Key</label>
          <input
            name="key"
            ref={register}
            className={`form-control ${errors.key ? 'is-invalid' : ''}`}
          />
          {errors.key && <div className="invalid-feedback">{errors.key.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido</label>
          <textarea
            name="content"
            ref={register}
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            rows="4"
          ></textarea>
          {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="file">Archivo (PDF o PNG)</label>
          <input
            type="file"
            name="file"
            ref={register}
            className={`form-control-file ${errors.file ? 'is-invalid' : ''}`}
            accept=".pdf, .png"
          />
          {errors.file && <div className="invalid-feedback d-block">{errors.file.message}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Subir</button>
      </form>
    </div>
  );
};

export default NewsletterUpload;