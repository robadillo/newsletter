import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Papa from 'papaparse';

const schema = yup.object().shape({
  file: yup
    .mixed()
    .required('Archivo es requerido')
    .test('fileType', 'Solo se permiten archivos CSV', value => {
      return value && value[0] && value[0].type === 'text/csv';
    }),
});

const BulkAddRecipients = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState([]);

  const onSubmit = async data => {
    try {
      const file = data.file[0]; // data.file es una lista de archivos
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async results => {
          const recipients = results.data.map(row => ({
            email: row.email,
            name: row.name,
          }));

          // Validar que los campos email y name existan
          const validRecipients = recipients.filter(r => r.email && r.name);

          if (validRecipients.length === 0) {
            alert('No hay datos válidos en el archivo CSV.');
            return;
          }

          await api.post('/recipients/bulk', { recipients: validRecipients });
          alert('Recipients agregados exitosamente');
          reset();
          navigate('/recipients');
        },
        error: error => {
          console.error('Error parsing CSV:', error);
          alert('Error al parsear el archivo CSV');
        },
      });
    } catch (error) {
      console.error('Error adding bulk recipients:', error);
      alert('Error al agregar los recipients');
    }
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => {
          setPreviewData(results.data);
        },
        error: error => {
          console.error('Error parsing CSV:', error);
          alert('Error al parsear el archivo CSV');
        },
      });
    } else {
      setPreviewData([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Carga Masiva de Recipients</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="file">Archivo CSV</label>
          <input
            type="file"
            name="file"
            {...register('file')}
            className={`form-control-file ${errors.file ? 'is-invalid' : ''}`}
            accept=".csv"
            onChange={handleFileChange}
          />
          {errors.file && <div className="invalid-feedback d-block">{errors.file.message}</div>}
        </div>
        {previewData.length > 0 && (
          <div className="mb-3">
            <h5>Vista Previa</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {previewData.slice(0, 5).map((row, index) => (
                  <tr key={index}>
                    <td>{row.email}</td>
                    <td>{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 5 && <p>Mostrando primeros 5 registros...</p>}
          </div>
        )}
        <button type="submit" className="btn btn-primary">Cargar Recipients</button>
      </form>
    </div>
  );
};

export default BulkAddRecipients;
