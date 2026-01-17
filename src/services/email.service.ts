/**
 * Service d'envoi d'emails via backend Gmail SMTP
 * Avec fallback automatique sur authinteractive@gmail.com
 */

interface EmailPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const sendContactForm = async (formData: EmailPayload): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/send-contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        honeypot: formData.honeypot || '',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de l\'envoi');
    }

    const data = await response.json();
    console.log('✅', data.message);
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    throw error;
  }
};
