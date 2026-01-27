/**
 * Script de test automatisé pour Stripe Checkout
 * Simule un achat complet depuis le frontend jusqu'à Stripe
 */

const TEST_CONFIG = {
  functionsUrl: 'http://127.0.0.1:5001/authinteractivedotcom/us-central1',
  testEmail: 'test@authinteractive.com',
  testProduct: {
    id: 'template-wingsuit-ue5',
    name: 'Système Wingsuit Complet UE5',
    description: 'Realistic wingsuit system with advanced physics',
    price: 79.99,
    quantity: 1,
    image: 'https://authinteractive.com/images/products/wingsuit.svg'
  }
};

async function testStripeCheckout() {
  console.log('🚀 Début du test Stripe Checkout\n');
  console.log('Configuration:');
  console.log(`  - Functions URL: ${TEST_CONFIG.functionsUrl}`);
  console.log(`  - Email de test: ${TEST_CONFIG.testEmail}`);
  console.log(`  - Produit: ${TEST_CONFIG.testProduct.name} (${TEST_CONFIG.testProduct.price}€)\n`);

  try {
    // Étape 1: Préparer les données du panier
    console.log('📦 Étape 1: Préparation du panier...');
    const cartItems = [TEST_CONFIG.testProduct];
    console.log('✅ Panier créé avec 1 produit\n');

    // Étape 2: Créer une session Stripe Checkout
    console.log('💳 Étape 2: Création de la session Stripe Checkout...');
    console.log(`   Appel: POST ${TEST_CONFIG.functionsUrl}/createCheckoutSession`);
    
    const requestBody = {
      items: cartItems,
      email: TEST_CONFIG.testEmail,
      userId: 'test-user-123'
    };
    
    console.log('   Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${TEST_CONFIG.functionsUrl}/createCheckoutSession`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`   Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur HTTP: ${response.status}\n${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Session créée avec succès!\n');

    // Étape 3: Afficher les détails de la session
    console.log('📋 Détails de la session Stripe:');
    console.log(`  - Session ID: ${data.sessionId}`);
    console.log(`  - URL Checkout: ${data.url}\n`);

    // Étape 4: Instructions pour finaliser le test
    console.log('✨ Test automatisé réussi!\n');
    console.log('📝 Pour finaliser le paiement:');
    console.log('   1. Ouvrez cette URL dans votre navigateur:');
    console.log(`      ${data.url}`);
    console.log('   2. Utilisez une carte de test Stripe:');
    console.log('      - Numéro: 4242 4242 4242 4242');
    console.log('      - Date: n\'importe quelle date future');
    console.log('      - CVC: n\'importe quel nombre à 3 chiffres');
    console.log('      - Code postal: n\'importe lequel');
    console.log('\n   3. Après paiement, vous serez redirigé vers:');
    console.log('      http://localhost:5173/success?session_id=...\n');

    console.log('🎯 Résultat: La première entrée sera visible dans:');
    console.log('   - Dashboard Stripe: https://dashboard.stripe.com/test/payments\n');

    // Retourner les données pour utilisation ultérieure
    return {
      success: true,
      sessionId: data.sessionId,
      checkoutUrl: data.url,
      product: TEST_CONFIG.testProduct,
      email: TEST_CONFIG.testEmail
    };

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    
    console.log('\n🔍 Vérifications:');
    console.log('   1. Firebase Functions est lancé? (http://127.0.0.1:5001)');
    console.log('   2. Le fichier functions/.env contient STRIPE_SECRET_KEY?');
    console.log('   3. La clé Stripe est valide (commence par sk_test_)?');
    console.log('   4. CORS est configuré pour localhost:5173?\n');

    return {
      success: false,
      error: error.message
    };
  }
}

// Exécution du test
(async () => {
  const result = await testStripeCheckout();
  
  if (result.success) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ TEST RÉUSSI - Session Stripe créée!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('Ouvrez l\'URL ci-dessus dans votre navigateur pour finaliser le paiement.');
    process.exit(0);
  } else {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ TEST ÉCHOUÉ');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }
})();
