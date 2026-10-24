import React, { useContext, useRef, useState } from 'react';
import { LanguageContext } from '../App';
import { sendContactForm } from '../services/email.service';
import { ArrowIcon, MailIcon } from '../components/Icons';

const EMPTY = { name: '', email: '', subject: '', message: '', honeypot: '' };

export default function Contact() {
  const { t } = useContext(LanguageContext);
  const c = t.contact;
  const subjects = [c.subject1, c.subject2, c.subject3, c.subject4, c.subject5];
  const [form, setForm] = useState({ ...EMPTY, subject: subjects[0] });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const startedAt = useRef(Date.now());

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContactForm({ ...form, startedAt: startedAt.current });
      setStatus('success');
      setForm({ ...EMPTY, subject: subjects[0] });
      startedAt.current = Date.now();
    } catch (error) {
      console.error('Erreur formulaire de contact :', error);
      setStatus('error');
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-art" role="img" aria-label={t.home.heroAlt} />
      <div className="ai-container contact-inner">
        <div style={{ flex: '1 1 340px', maxWidth: 420, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <p className="ai-kicker">{c.kicker}</p>
          <h1 className="ai-display page-hero-title" style={{ textTransform: 'uppercase' }}>{c.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 17 }}>{c.intro}</p>
          <a href="mailto:support@authinteractive.com" className="ai-card" style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: '18px 20px' }}>
            <span style={{ color: 'var(--accent)', display: 'flex' }}><MailIcon /></span>
            <span style={{ minWidth: 0 }}>
              <span className="ai-meta" style={{ display: 'block', color: 'var(--text-muted)' }}>{c.email_label}</span>
              <span style={{ display: 'block', fontWeight: 500 }}>support@authinteractive.com</span>
            </span>
          </a>
          <ul className="ai-dash-list">
            <li>{c.reason1}</li>
            <li>{c.reason2}</li>
            <li>{c.reason3}</li>
          </ul>
        </div>

        <form className="contact-form-panel" onSubmit={handleSubmit}>
          <label className="ai-field">
            {c.name}
            <input className="ai-input" type="text" required maxLength={100} autoComplete="name" placeholder={c.namePh} value={form.name} onChange={update('name')} />
          </label>
          <label className="ai-field">
            {c.email}
            <input className="ai-input" type="email" required maxLength={200} autoComplete="email" placeholder="vous@exemple.com" value={form.email} onChange={update('email')} />
          </label>
          <label className="ai-field full">
            {c.subject}
            <select className="ai-input" value={form.subject} onChange={update('subject')}>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="ai-field full">
            {c.message}
            <textarea className="ai-input" rows={6} required minLength={10} maxLength={5000} placeholder={c.messagePh} value={form.message} onChange={update('message')} />
          </label>

          {/* Champ invisible : piège à robots */}
          <div className="ai-honeypot" aria-hidden="true">
            <label>
              Ne pas remplir
              <input type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={update('honeypot')} />
            </label>
          </div>

          <div className="full" aria-live="polite">
            {status === 'success' && <p className="ai-status ai-status--success">{c.success}</p>}
            {status === 'error' && <p className="ai-status ai-status--error">{c.error}</p>}
          </div>

          <div className="full">
            <button type="submit" className="ai-btn ai-btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? c.sending : c.send}
              <ArrowIcon />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
