const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors')({
  origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'https://authinteractive.com']
});

admin.initializeApp();
const db = admin.firestore();

// Fonction pour générer une clé de licence
function generateLicenseKey(productId) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `AUTH-${timestamp}-${random}`;
}

// Créer une session Stripe Checkout
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { items, email, userId } = req.body;

      if (!items || !items.length || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Créer les line items pour Stripe
      const lineItems = items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: item.image ? [item.image] : []
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity || 1
      }));

      // Créer la session Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout`,
        customer_email: email,
        metadata: {
          userId: userId || 'guest',
          email: email
        }
      });

      // Sauvegarder la commande dans Firestore
      const orderRef = await db.collection('orders').add({
        sessionId: session.id,
        email: email,
        userId: userId || null,
        items: items,
        total: items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Order created: ${orderRef.id}`);

      res.status(200).json({
        sessionId: session.id,
        url: session.url
      });

    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Webhook Stripe pour gérer les confirmations de paiement
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer l'événement checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      // Trouver la commande correspondante
      const ordersRef = db.collection('orders');
      const snapshot = await ordersRef.where('sessionId', '==', session.id).get();

      if (snapshot.empty) {
        console.error('Order not found for session:', session.id);
        return res.status(404).send('Order not found');
      }

      const orderDoc = snapshot.docs[0];
      const orderData = orderDoc.data();

      // Générer les clés de licence pour chaque produit
      const licenseKeys = orderData.items.map(item => ({
        productId: item.id,
        productName: item.name,
        licenseKey: generateLicenseKey(item.id),
        downloadUrl: item.downloadUrl || `https://authinteractive.com/downloads/${item.id}`
      }));

      // Mettre à jour la commande avec les clés de licence
      await orderDoc.ref.update({
        status: 'completed',
        paymentStatus: 'paid',
        licenseKeys: licenseKeys,
        completedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Order ${orderDoc.id} completed with license keys`);

      // TODO: Envoyer un email avec les clés de licence via SendGrid ou autre service
      // await sendLicenseEmail(orderData.email, licenseKeys);

    } catch (error) {
      console.error('Error processing webhook:', error);
      return res.status(500).send('Webhook processing error');
    }
  }

  res.status(200).send('Webhook received');
});

// Récupérer les détails d'une commande
exports.getOrderDetails = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const sessionId = req.query.sessionId;

      if (!sessionId) {
        return res.status(400).json({ error: 'Missing sessionId' });
      }

      // Trouver la commande
      const ordersRef = db.collection('orders');
      const snapshot = await ordersRef.where('sessionId', '==', sessionId).get();

      if (snapshot.empty) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const orderDoc = snapshot.docs[0];
      const orderData = orderDoc.data();

      res.status(200).json({
        orderId: orderDoc.id,
        ...orderData,
        createdAt: orderData.createdAt?.toDate().toISOString(),
        completedAt: orderData.completedAt?.toDate().toISOString()
      });

    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: error.message });
    }
  });
});
