import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé !');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-container">
      <h1>{t.contact.title}</h1>
      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder={t.contact.name} 
            value={form.name} 
            onChange={(e) => setForm({...form, name: e.target.value})} 
            required 
          />
          <input 
            type="email" 
            placeholder={t.contact.email} 
            value={form.email} 
            onChange={(e) => setForm({...form, email: e.target.value})} 
            required 
          />
          <textarea 
            placeholder={t.contact.message} 
            rows="5" 
            value={form.message} 
            onChange={(e) => setForm({...form, message: e.target.value})} 
            required
          ></textarea>
          <button type="submit" className="btn">{t.contact.send}</button>
        </form>
        <div className="contact-info">
          <p><strong>{t.contact.email_label}:</strong> support@authinteractive.com</p>
        </div>
      </div>
    </div>
  );
}
