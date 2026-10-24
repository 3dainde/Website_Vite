import React, { useContext, useState } from 'react';
import { LanguageContext } from '../App';
import { subscribeNewsletter } from '../services/email.service';

// Bandeau "Soyez prévenu à la sortie" : inscrit l'adresse à la liste de diffusion.
export default function NewsletterForm({ id = 'suivre', source = 'site' }) {
  const { t } = useContext(LanguageContext);
  const n = t.newsletter;
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setStatus('error');
      setError(n.consentRequired);
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await subscribeNewsletter({ email, consent, source, honeypot });
      setStatus('success');
      setEmail('');
      setConsent(false);
    } catch {
      setStatus('error');
      setError(n.error);
    }
  };

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="notify-band">
      <div style={{ flex: '1 1 320px', minWidth: 0 }}>
        <h2 id={`${id}-title`} className="ai-display" style={{ fontSize: 24, fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
          {n.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>{n.desc}</p>
      </div>
      <form className="notify-form" onSubmit={handleSubmit} noValidate={false}>
        <div className="notify-row">
          <label htmlFor={`${id}-email`} className="sr-only">{n.email}</label>
          <input
            id={`${id}-email`}
            className="ai-input"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="ai-btn ai-btn--primary" disabled={status === 'sending'}>
            {status === 'sending' ? n.sending : n.submit}
          </button>
        </div>
        <label className="ai-check">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>{n.consent}</span>
        </label>
        <div className="ai-honeypot" aria-hidden="true">
          <label>
            Ne pas remplir
            <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>
        <div aria-live="polite">
          {status === 'success' && <p className="ai-status ai-status--success">{n.success}</p>}
          {status === 'error' && <p className="ai-status ai-status--error">{error}</p>}
        </div>
      </form>
    </section>
  );
}
