// src/services/stripe.service.ts
/**
 * Service Stripe pour gérer les paiements
 * À implémenter avec Firebase Functions
 */

export interface StripeConfig {
  publishableKey: string;
  secretKey?: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'requires_capture' | 'canceled';
  clientSecret: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  status: 'open' | 'complete' | 'expired';
}

class StripeService {
  private config: StripeConfig;

  constructor(config: StripeConfig) {
    this.config = config;
  }

  /**
   * Créer une intention de paiement
   */
  async createPaymentIntent(amount: number, description: string): Promise<PaymentIntent> {
    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, description })
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Créer une session de checkout Stripe
   */
  async createCheckoutSession(items: any[]): Promise<CheckoutSession> {
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  /**
   * Récupérer les détails d'une intention de paiement
   */
  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    try {
      const response = await fetch(`/api/stripe/payment-intent/${paymentIntentId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      throw error;
    }
  }

  /**
   * Générer une clé de licence
   */
  static generateLicenseKey(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 15).toUpperCase();
    return `AUTH-${timestamp}-${random}`;
  }

  /**
   * Valider une clé de licence
   */
  static validateLicenseKey(key: string): boolean {
    return /^AUTH-[A-Z0-9]+-[A-Z0-9]+$/.test(key);
  }
}

export default StripeService;
