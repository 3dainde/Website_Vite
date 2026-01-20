// src/services/stripe.service.ts
/**
 * Service Stripe intégré avec Firebase Functions
 */

const FUNCTIONS_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 'https://us-central1-authinteractivedotcom.cloudfunctions.net';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  downloadUrl?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface OrderDetails {
  orderId: string;
  sessionId: string;
  email: string;
  items: CartItem[];
  total: number;
  status: string;
  licenseKeys?: Array<{
    productId: string;
    productName: string;
    licenseKey: string;
    downloadUrl: string;
  }>;
  createdAt: string;
  completedAt?: string;
}

class StripeService {
  /**
   * Créer une session Stripe Checkout
   */
  async createCheckoutSession(
    items: CartItem[],
    email: string,
    userId?: string
  ): Promise<CheckoutSessionResponse> {
    try {
      const response = await fetch(`${FUNCTIONS_URL}/createCheckoutSession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email, userId })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  /**
   * Récupérer les détails d'une commande
   */
  async getOrderDetails(sessionId: string): Promise<OrderDetails> {
    try {
      const response = await fetch(`${FUNCTIONS_URL}/getOrderDetails?sessionId=${sessionId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch order details');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }
}

const stripeService = new StripeService();

export default stripeService;
