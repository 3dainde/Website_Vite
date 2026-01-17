import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (!formspreeId) {
      setStatusMessage('⚠️ Formspree ID non configuré');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatusMessage('✅ Message envoyé avec succès !');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatusMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setStatusMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Contactez-nous</h1>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Votre nom" 
            value={form.name} 
            onChange={(e) => setForm({...form, name: e.target.value})} 
            required 
          />
          <input 
            type="email" 
            placeholder="Votre email" 
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})} 
            required 
          />
          <textarea 
            placeholder="Votre message" 
            rows="5" 
            value={form.message} 
            onChange={(e) => setForm({...form, message: e.target.value})} 
            required
          ></textarea>

          {statusMessage && (
            <div className={`status-message ${statusMessage.includes('✅') ? 'success' : 'error'}`}>
              {statusMessage}
            </div>
          )}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Envoi en cours...' : 'Envoyer'}
          </button>

          <div className="contact-header">
            <p><strong>Email:</strong> support@authinteractive.com</p>
          </div>
        </form>
      </div>
    </div>
  );
}
