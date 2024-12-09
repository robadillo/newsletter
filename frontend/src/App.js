import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Footer from './components/Shared/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import NewsletterList from './components/Newsletters/NewsletterList';
import NewsletterUpload from './components/Newsletters/NewsletterUpload';
import SendNewsletter from './components/Newsletters/SendNewsletter';
import NewsletterDetails from './components/Newsletters/NewsletterDetails';
import RecipientsList from './components/Recipients/RecipientsList';
import AddRecipient from './components/Recipients/AddRecipient';
import BulkAddRecipients from './components/Recipients/BulkAddRecipients';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newsletters" element={<NewsletterList />} />
          <Route path="/newsletters/upload" element={<NewsletterUpload />} />
          <Route path="/newsletters/send/:key" element={<SendNewsletter />} />
          <Route path="/newsletters/:key" element={<NewsletterDetails />} />
          <Route path="/recipients" element={<RecipientsList />} />
          <Route path="/recipients/add" element={<AddRecipient />} />
          <Route path="/recipients/bulk-add" element={<BulkAddRecipients />} />
          {/* Ruta para 404 */}
          <Route path="*" element={
            <div className="container mt-4">
              <h2>404 - Página No Encontrada</h2>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;