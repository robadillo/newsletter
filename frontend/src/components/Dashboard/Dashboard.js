import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [newsletterStats, setNewsletterStats] = useState([]);

  useEffect(() => {
    // Obtener estadísticas generales
    api.get('/stats/')
      .then(response => setStats(response.data))
      .catch(error => console.error('Error fetching general stats:', error));

    // Obtener todos los newsletters
    api.get('/newsletter/')
      .then(response => {
        const newsletters = response.data;
        const keys = newsletters.map(n => n.key);
        // Obtener estadísticas por cada newsletter
        const fetchStats = keys.map(key =>
          api.get(`/stats/newsletter/${key}`).then(res => res.data)
        );
        Promise.all(fetchStats)
          .then(results => setNewsletterStats(results))
          .catch(error => console.error('Error fetching newsletter stats:', error));
      })
      .catch(error => console.error('Error fetching newsletters:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Dashboard de Estadísticas</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Newsletters</h5>
              <p className="card-text">{stats.total_newsletters || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Recipients</h5>
              <p className="card-text">{stats.total_recipients || 0}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Total Emails Sent</h5>
              <p className="card-text">{stats.total_emails_sent || 0}</p>
            </div>
          </div>
        </div>
      </div>
      <h3>Estadísticas por Newsletter</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={newsletterStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="newsletter_key" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="emails_sent" fill="#8884d8" name="Emails Enviados" />
          <Bar dataKey="current_subscribers" fill="#82ca9d" name="Suscriptores Actuales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;