import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé !');
    setForm({ name: '', email: '', message: '' });
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
          <button type="submit" className="btn">Envoyer</button>
        </form>
        <div className="contact-info">
          <p><strong>Email:</strong> support@authinteractive.com</p>
        </div>
      </div>
    </div>
  );
}
