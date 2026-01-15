import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectUserLanguage } from '../services/geolocation.service';
import { preloadTranslations } from '../services/translation.service';

// Traductions de base en français (langue source)
const baseTranslations = {
  nav: {
    home: 'Accueil',
    products: 'Produits',
    games: 'Jeux Vidéo',
    development: 'Développement',
    contact: 'Contact',
    cart: 'Panier'
  },
  home: {
    welcome: 'Bienvenue chez Auth Interactive',
    subtitle: 'Créons des expériences ludiques et immersives',
    discover: 'Découvrir nos jeux',
    specialties: 'Nos spécialités',
    innovativeGames: 'Jeux Innovants',
    devTools: 'Game Design',
    qualityAssets: 'Plugins',
    games_desc: 'Des jeux uniques qui repoussent les limites de la créativité',
    tools_desc: 'Création de concepts et designs innovants pour vos projets ludiques',
    assets_desc: 'Librairie complète d\'assets pour vos projets'
  },
  products: {
    title: 'Nos Produits',
    buy: 'Acheter',
    addToCart: 'Ajouter au panier',
    price: 'Prix',
    description: 'Description'
  },
  games: {
    title: 'Nos Jeux',
    available: 'Disponible',
    coming: 'En développement'
  },
  development: {
    title: 'Ressources Développement',
    tools: 'Outils',
    technologies: 'Technologies'
  },
  contact: {
    title: 'Contactez-nous',
    name: 'Votre nom',
    email: 'Votre email',
    message: 'Votre message',
    send: 'Envoyer',
    email_label: 'Email'
  },
  cart: {
    title: 'Votre Panier',
    empty: 'Votre panier est vide',
    total: 'Total',
    checkout: 'Passer commande',
    continueShopping: 'Continuer les achats'
  },
  checkout: {
    title: 'Finaliser la commande',
    payment: 'Paiement',
    shipping: 'Livraison',
    confirm: 'Confirmer'
  },
  auth: {
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    email: 'Email',
    password: 'Mot de passe',
    name: 'Nom',
    forgotPassword: 'Mot de passe oublié ?'
  },
  footer: {
    copyright: 'Tous droits réservés'
  },
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer'
  }
};

type TranslationsType = typeof baseTranslations;

interface TranslationContextType {
  lang: string;
  setLang: (lang: string) => void;
  t: TranslationsType;
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<string>('fr');
  const [translations, setTranslations] = useState<TranslationsType>(baseTranslations);
  const [loading, setLoading] = useState<boolean>(true);

  // Détection automatique de la langue au chargement
  useEffect(() => {
    const initLanguage = async () => {
      try {
        setLoading(true);
        console.log('🌐 Initialisation de la traduction automatique...');
        
        // Détecter la langue de l'utilisateur
        const detectedLang = await detectUserLanguage();
        console.log('🎯 Langue détectée:', detectedLang);
        
        setLangState(detectedLang);
        
        // Si ce n'est pas le français (langue source), traduire
        if (detectedLang !== 'fr') {
          console.log('🔄 Chargement des traductions...');
          const translated = await preloadTranslations(baseTranslations, detectedLang);
          setTranslations(translated);
        } else {
          setTranslations(baseTranslations);
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la langue:', error);
        setTranslations(baseTranslations);
      } finally {
        setLoading(false);
      }
    };

    initLanguage();
  }, []);

  // Changer la langue manuellement
  const setLang = async (newLang: string) => {
    if (newLang === lang) return;
    
    try {
      setLoading(true);
      console.log('🔄 Changement de langue vers:', newLang);
      
      setLangState(newLang);
      localStorage.setItem('userLanguage', newLang);
      
      if (newLang !== 'fr') {
        const translated = await preloadTranslations(baseTranslations, newLang);
        setTranslations(translated);
      } else {
        setTranslations(baseTranslations);
      }
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TranslationContext.Provider value={{ lang, setLang, t: translations, loading }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation doit être utilisé dans un TranslationProvider');
  }
  return context;
};
