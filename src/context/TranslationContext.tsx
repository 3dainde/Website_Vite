import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectUserLanguage } from '../services/geolocation.service';
import { preloadTranslations } from '../services/translation.service';

// Traductions de base en français (langue source)
const baseTranslations = {
  nav: {
    home: 'Accueil',
    games: 'Nos jeux',
    shop: 'Boutique',
    contact: 'Contact',
    cart: 'Panier',
    menu: 'Menu',
    main: 'Navigation principale'
  },
  home: {
    kicker: 'Studio de jeux vidéo indépendant',
    tagline1: 'Des jeux vidéo',
    tagline2: 'qui sortent du cadre',
    intro: 'Nous concevons nos propres jeux sous Unreal Engine 5, composons leurs musiques et partageons les systèmes nés de ces projets.',
    ctaGames: 'Voir nos jeux',
    ctaShop: 'La boutique',
    side1: 'Imaginer',
    side2: 'Créer',
    side3: 'Jouer',
    projects: 'Nos projets',
    allProjects: 'Tous les projets',
    shopTitle: 'La boutique',
    musicKicker: '01 — Musiques',
    musicTitle: 'Bandes-son de jeu',
    musicDesc: "Les musiques composées pour nos jeux, à écouter avant d'acheter.",
    musicCta: 'Écouter',
    tplKicker: '02 — Templates',
    tplTitle: 'Systèmes UE5',
    tplDesc: 'Les systèmes de nos jeux, prêts à brancher dans les vôtres.',
    tplCta: 'Découvrir',
    heroAlt: 'Soldat face à un portail lumineux dans une structure de cubes'
  },
  gamesPage: {
    kicker: 'Projets en cours',
    title: 'Nos jeux',
    intro: 'Les jeux que le studio développe, et les expérimentations techniques qui les nourrissent.',
    inDev: 'En développement',
    inDevTitle: 'Jeux en développement',
    progress: 'Avancement',
    notify: 'Me prévenir à la sortie',
    devlog: 'Devlog',
    labs: 'Expérimentations & tech',
    stages: 'Concept|Prototype|Alpha|Bêta|Sortie'
  },
  newsletter: {
    title: 'Soyez prévenu à la sortie',
    desc: "Un e-mail quand un jeu passe en bêta ou sort, et nos nouveautés. Rien d'autre.",
    email: 'Adresse e-mail',
    consent: "J'accepte de recevoir les nouveautés d'AuthInteractive. Désinscription en un clic à tout moment.",
    submit: 'Me prévenir',
    sending: 'Envoi…',
    success: "C'est noté ! Vous serez prévenu par e-mail.",
    error: "L'inscription n'a pas pu aboutir. Réessayez dans un instant.",
    consentRequired: 'Cochez la case pour accepter de recevoir nos e-mails.'
  },
  shop: {
    kicker: 'Musiques & templates',
    title: 'Boutique',
    intro: "Ce qu'on crée pour nos jeux, disponible pour les vôtres.",
    tabsLabel: 'Sections de la boutique',
    music: 'Musiques',
    templates: 'Templates',
    play: 'Écouter',
    pause: 'Pause',
    add: 'Ajouter',
    added: 'Ajouté',
    soon: 'Bientôt en vente',
    previewMissing: 'Extrait bientôt disponible',
    sacem: 'Œuvre protégée · SACEM',
    sacemHelp: 'Cette musique est déposée à la SACEM. Toute réutilisation nécessite une licence.',
    demo: 'Démo',
    details: 'Détails',
    nextTpl: 'Prochain template',
    nextTplDesc: 'Un système dont vous auriez besoin pour votre jeu ?',
    nextTplCta: 'Proposez-le',
    cart: 'Panier',
    cartEmpty: 'Votre panier est vide.',
    total: 'Total',
    checkout: 'Passer commande',
    remove: 'Retirer',
    secure: 'Paiement sécurisé · Téléchargement après achat'
  },
  contact: {
    kicker: 'Parlons-en',
    title: 'Contact',
    intro: 'Une question sur un achat, une licence musicale, ou envie de collaborer sur un jeu ? Écrivez-nous.',
    reason1: 'Support boutique',
    reason2: 'Licence ou musique sur mesure',
    reason3: 'Collaboration, presse, game design',
    name: 'Nom',
    namePh: 'Votre nom',
    email: 'E-mail',
    subject: 'Sujet',
    subject1: 'Support boutique (template, téléchargement)',
    subject2: 'Licence ou musique sur mesure',
    subject3: 'Collaboration / presse',
    subject4: 'Nos jeux',
    subject5: 'Autre',
    message: 'Message',
    messagePh: 'Décrivez votre demande…',
    send: 'Envoyer',
    sending: 'Envoi…',
    success: 'Message envoyé. Nous vous répondons rapidement, un accusé de réception arrive dans votre boîte mail.',
    error: "Le message n'a pas pu être envoyé. Réessayez, ou écrivez directement à support@authinteractive.com.",
    email_label: 'E-mail'
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
    copyright: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
    terms: 'CGV'
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

// Complète une traduction (éventuellement en cache et incomplète) avec le texte français.
function withFallback<T>(base: T, translated: any): T {
  if (typeof base !== 'object' || base === null) {
    return (typeof translated === typeof base ? translated : base) as T;
  }
  const out: any = Array.isArray(base) ? [] : {};
  for (const key of Object.keys(base as any)) {
    out[key] = withFallback((base as any)[key], translated ? translated[key] : undefined);
  }
  return out;
}

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
          setTranslations(withFallback(baseTranslations, translated));
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
        setTranslations(withFallback(baseTranslations, translated));
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
