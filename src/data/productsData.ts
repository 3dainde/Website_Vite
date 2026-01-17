// src/data/productsData.ts

export type ProductCategory = 'game' | 'gamedesign' | 'plugin' | 'training' | 'asset';

export interface Product {
  id: string;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  longDesc: string;
  longDescEn: string;
  price: number;
  type: 'template' | 'asset' | 'formation';
  category: ProductCategory; // Nouvelle propriété
  tags: string[]; // Tags pour recherche avancée
  image: string;
  features: string[];
  featuresEn: string[];
  downloadSize: string;
  compatibility: string[];
  demoUrl?: string;
  videoUrl?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'template-wingsuit-ue5',
    title: 'Système Wingsuit Complet UE5',
    titleEn: 'Complete Wingsuit System UE5',
    shortDesc: 'Système de wingsuit réaliste avec physique avancée',
    shortDescEn: 'Realistic wingsuit system with advanced physics',
    longDesc: 'Système complet de wingsuit pour Unreal Engine 5 avec physique réaliste, animations fluides, système de boost, contrôle précis et effets visuels immersifs. Prêt à intégrer dans vos projets.',
    longDescEn: 'Complete wingsuit system for Unreal Engine 5 with realistic physics, smooth animations, boost system, precise controls and immersive visual effects. Ready to integrate into your projects.',
    price: 79.99,
    type: 'template',
    category: 'game',
    tags: ['wingsuit', 'physique', 'vol', 'action', 'sport'],
    image: '/images/products/wingsuit.svg',
    features: [
      'Physique réaliste basée sur la vraie aérodynamique',
      'Système de boost et contrôle avancé',
      '5+ animations mocap incluses',
      'Effets visuels (trails, vent, vitesse)',
      'Documentation complète + vidéos tutoriels',
      'Support technique 6 mois'
    ],
    featuresEn: [
      'Realistic physics based on real aerodynamics',
      'Boost system and advanced controls',
      '5+ mocap animations included',
      'Visual effects (trails, wind, speed)',
      'Complete documentation + video tutorials',
      '6 months technical support'
    ],
    downloadSize: '2.3 GB',
    compatibility: ['Unreal Engine 5.3+', 'Windows', 'Mac'],
    demoUrl: 'https://demo.authinteractive.com/wingsuit',
    videoUrl: 'https://youtube.com/watch?v=demo'
  },
  {
    id: 'formation-blueprint-master',
    title: 'Formation Blueprint Master Class',
    titleEn: 'Blueprint Master Class Training',
    shortDesc: 'Devenez expert Blueprint sans coder',
    shortDescEn: 'Become Blueprint expert without coding',
    longDesc: 'Formation intensive Blueprint UE5 : de débutant à expert. Créez des systèmes complexes sans une ligne de code. 25h de vidéos pratiques.',
    longDescEn: 'Intensive UE5 Blueprint training: from beginner to expert. Create complex systems without a single line of code. 25h practical videos.',
    price: 99.99,
    type: 'formation',
    category: 'training',
    tags: ['blueprint', 'formation', 'unreal', 'débutant', 'expert'],
    image: '/images/products/blueprint.svg',
    features: [
      '25h de vidéos pratiques',
      'De débutant à expert',
      '8 projets complets',
      'Exercices corrigés',
      'Accès à vie',
      'Support Discord'
    ],
    featuresEn: [
      '25h practical videos',
      'Beginner to expert',
      '8 complete projects',
      'Corrected exercises',
      'Lifetime access',
      'Discord support'
    ],
    downloadSize: '7 GB',
    compatibility: ['Unreal Engine 5.0+']
  },
  {
    id: 'asset-scifi-pack',
    title: 'Pack Assets Sci-Fi Premium',
    titleEn: 'Premium Sci-Fi Asset Pack',
    shortDesc: '200+ assets sci-fi optimisés pour jeux AAA',
    shortDescEn: '200+ optimized sci-fi assets for AAA games',
    longDesc: 'Collection massive de 200+ assets sci-fi haute qualité : armes, props, véhicules, architecture. Textures 4K PBR, LODs inclus, optimisé pour la performance.',
    longDescEn: 'Massive collection of 200+ high-quality sci-fi assets: weapons, props, vehicles, architecture. 4K PBR textures, LODs included, performance optimized.',
    price: 149.99,
    type: 'asset',
    category: 'asset',
    tags: ['sci-fi', 'assets', '3d', 'pbr', 'futuriste'],
    image: '/images/products/scifi-pack.svg',
    features: [
      '200+ assets uniques',
      'Textures PBR 4K',
      'LODs et collisions optimisés',
      'Modular et customizable',
      'Compatible UE5 Lumen/Nanite',
      'Mises à jour gratuites'
    ],
    featuresEn: [
      '200+ unique assets',
      'PBR 4K textures',
      'Optimized LODs and collisions',
      'Modular and customizable',
      'UE5 Lumen/Nanite compatible',
      'Free updates'
    ],
    downloadSize: '8.7 GB',
    compatibility: ['Unreal Engine 5.0+', 'Unity 2021+', 'Blender 3.0+']
  },
  {
    id: 'formation-ue5-advanced',
    title: 'Formation UE5 Avancé - Game Dev Pro',
    titleEn: 'Advanced UE5 Training - Pro Game Dev',
    shortDesc: 'Maîtrisez UE5 de A à Z avec projets réels',
    shortDescEn: 'Master UE5 from A to Z with real projects',
    longDesc: 'Formation complète Unreal Engine 5 : Blueprint avancé, C++, Niagara, Lumen, networking multijoueur. 40h de vidéos, 10 projets pratiques, certificat final.',
    longDescEn: 'Complete Unreal Engine 5 training: Advanced Blueprint, C++, Niagara, Lumen, multiplayer networking. 40h videos, 10 practical projects, final certificate.',
    price: 199.99,
    type: 'formation',
    category: 'training',
    tags: ['ue5', 'c++', 'multiplayer', 'avancé', 'pro'],
    image: '/images/products/formation-ue5.svg',
    features: [
      '40h de vidéos HD',
      '10 projets complets',
      'Blueprint + C++ avancé',
      'Multiplayer networking',
      'Accès à vie + mises à jour',
      'Certificat de complétion',
      'Communauté Discord privée'
    ],
    featuresEn: [
      '40h HD videos',
      '10 complete projects',
      'Advanced Blueprint + C++',
      'Multiplayer networking',
      'Lifetime access + updates',
      'Completion certificate',
      'Private Discord community'
    ],
    downloadSize: '12 GB (vidéos)',
    compatibility: ['Unreal Engine 5.3', 'Windows 10+', 'Mac']
  },
  {
    id: 'template-inventory-system',
    title: 'Système Inventaire Avancé',
    titleEn: 'Advanced Inventory System',
    shortDesc: 'Inventaire drag & drop, craft, équipement',
    shortDescEn: 'Drag & drop inventory, crafting, equipment',
    longDesc: 'Système d\'inventaire professionnel avec drag & drop, système de craft, équipement, stats, sauvegarde cloud, UI customizable. Compatible multijoueur.',
    longDescEn: 'Professional inventory system with drag & drop, crafting, equipment, stats, cloud save, customizable UI. Multiplayer compatible.',
    price: 59.99,
    type: 'template',
    category: 'plugin',
    tags: ['inventaire', 'ui', 'craft', 'rpg', 'système'],
    image: '/images/products/inventory.svg',
    features: [
      'Drag & drop fluide',
      'Système de craft avancé',
      'Équipement et stats',
      'Sauvegarde cloud automatique',
      'UI 100% customizable',
      'Compatible multijoueur'
    ],
    featuresEn: [
      'Smooth drag & drop',
      'Advanced crafting system',
      'Equipment and stats',
      'Automatic cloud save',
      '100% customizable UI',
      'Multiplayer compatible'
    ],
    downloadSize: '450 MB',
    compatibility: ['Unreal Engine 5.0+']
  },
  {
    id: 'asset-nature-megapack',
    title: 'Mega Pack Nature Réaliste',
    titleEn: 'Realistic Nature Mega Pack',
    shortDesc: '500+ assets nature photogrammétrie',
    shortDescEn: '500+ photogrammetry nature assets',
    longDesc: 'Collection géante d\'assets nature photoscannés : arbres, rochers, plantes, fleurs. Qualité photographique, optimisé pour Nanite.',
    longDescEn: 'Giant collection of photoscanned nature assets: trees, rocks, plants, flowers. Photographic quality, Nanite optimized.',
    price: 89.99,
    type: 'asset',
    category: 'asset',
    tags: ['nature', 'photogrammétrie', 'nanite', 'réaliste', 'environnement'],
    image: '/images/products/nature.svg',
    features: [
      '500+ assets photoscannés',
      'Qualité photographique',
      'Nanite optimisé',
      'Variations saisonnières',
      'Animations vent incluses',
      'Biomes complets'
    ],
    featuresEn: [
      '500+ photoscanned assets',
      'Photographic quality',
      'Nanite optimized',
      'Season variations',
      'Wind animation ready',
      'Complete biomes'
    ],
    downloadSize: '15 GB',
    compatibility: ['Unreal Engine 5.1+', 'Unity 2022+']
  }
];

// Fonction helper pour obtenir un produit par ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}

// Fonction helper pour filtrer par type
export function getProductsByType(type: 'template' | 'asset' | 'formation'): Product[] {
  return PRODUCTS.filter(p => p.type === type);
}

// Fonction helper pour filtrer par catégorie
export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

// Fonction helper pour filtrer par lettre
export function getProductsByLetter(letter: string, lang: 'fr' | 'en' = 'fr'): Product[] {
  return PRODUCTS.filter(p => {
    const title = lang === 'en' ? p.titleEn : p.title;
    return title.toLowerCase().startsWith(letter.toLowerCase());
  });
}

// Fonction helper pour recherche par tags
export function searchProductsByTag(tag: string): Product[] {
  return PRODUCTS.filter(p => 
    p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}
