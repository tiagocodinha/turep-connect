export interface Program {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  operatorId: string;
  destinations: string[];
  duration: number;
  theme: 'cultural' | 'nature' | 'beach' | 'city-break' | 'escorted';
  highlights: {
    pt: string[];
    en: string[];
  };
  seasonalNotes: {
    pt: string;
    en: string;
  };
  image: string;
}

export const programs: Program[] = [
  {
    id: 'morocco-imperial',
    title: {
      pt: 'Cidades Imperiais de Marrocos',
      en: 'Imperial Cities of Morocco',
    },
    operatorId: 'luxotour',
    destinations: ['Morocco'],
    duration: 8,
    theme: 'cultural',
    highlights: {
      pt: [
        'Visita às quatro cidades imperiais: Marrakech, Fez, Meknes e Rabat',
        'Exploração dos souks e medinas históricas',
        'Alojamento em riads tradicionais',
        'Gastronomia marroquina autêntica',
      ],
      en: [
        'Visit all four imperial cities: Marrakech, Fez, Meknes, and Rabat',
        'Exploration of historic souks and medinas',
        'Accommodation in traditional riads',
        'Authentic Moroccan gastronomy',
      ],
    },
    seasonalNotes: {
      pt: 'Disponível todo o ano. Primavera e outono oferecem clima ideal.',
      en: 'Available year-round. Spring and autumn offer ideal weather.',
    },
    image: '/programs/morocco-imperial.jpg',
  },
  {
    id: 'sahara-adventure',
    title: {
      pt: 'Aventura no Deserto do Sahara',
      en: 'Sahara Desert Adventure',
    },
    operatorId: 'luxotour',
    destinations: ['Morocco'],
    duration: 5,
    theme: 'nature',
    highlights: {
      pt: [
        'Noite sob as estrelas em acampamento berbere',
        'Passeio de camelo nas dunas de Erg Chebbi',
        'Visita a kasbahs históricas',
        'Encontro com comunidades nómadas',
      ],
      en: [
        'Night under the stars in Berber camp',
        'Camel trek in Erg Chebbi dunes',
        'Visit to historic kasbahs',
        'Meeting with nomadic communities',
      ],
    },
    seasonalNotes: {
      pt: 'Melhor de outubro a abril. Evitar verão devido ao calor extremo.',
      en: 'Best from October to April. Avoid summer due to extreme heat.',
    },
    image: '/programs/sahara-adventure.jpg',
  },
  {
    id: 'albania-highlights',
    title: {
      pt: 'Destaques da Albânia',
      en: 'Albania Highlights',
    },
    operatorId: 'albania-dmc',
    destinations: ['Albania'],
    duration: 7,
    theme: 'cultural',
    highlights: {
      pt: [
        'Tirana: capital vibrante e colorida',
        'Berat: cidade museu UNESCO',
        'Riviera albanesa e praias pristinas',
        'Gjirokastra: arquitetura otomana',
      ],
      en: [
        'Tirana: vibrant and colorful capital',
        'Berat: UNESCO museum city',
        'Albanian Riviera and pristine beaches',
        'Gjirokastra: Ottoman architecture',
      ],
    },
    seasonalNotes: {
      pt: 'Maio a outubro ideal. Verão perfeito para praia.',
      en: 'May to October ideal. Summer perfect for beach.',
    },
    image: '/programs/albania-highlights.jpg',
  },
  {
    id: 'balkan-explorer',
    title: {
      pt: 'Grande Tour dos Balcãs',
      en: 'Grand Balkan Tour',
    },
    operatorId: 'albania-dmc',
    destinations: ['Albania', 'North Macedonia', 'Kosovo', 'Montenegro'],
    duration: 12,
    theme: 'escorted',
    highlights: {
      pt: [
        'Quatro países em uma viagem épica',
        'Lagos de Ohrid e Skadar',
        'Mosteiros ortodoxos e mesquitas otomanas',
        'Gastronomia balcânica diversificada',
      ],
      en: [
        'Four countries in one epic journey',
        'Lakes Ohrid and Skadar',
        'Orthodox monasteries and Ottoman mosques',
        'Diverse Balkan gastronomy',
      ],
    },
    seasonalNotes: {
      pt: 'Primavera e outono são ideais para este circuito.',
      en: 'Spring and autumn are ideal for this circuit.',
    },
    image: '/programs/balkan-explorer.jpg',
  },
  {
    id: 'albanian-riviera',
    title: {
      pt: 'Riviera Albanesa e Relaxamento',
      en: 'Albanian Riviera Relaxation',
    },
    operatorId: 'albania-dmc',
    destinations: ['Albania'],
    duration: 10,
    theme: 'beach',
    highlights: {
      pt: [
        'Praias de águas cristalinas em Ksamil',
        'Butrint: ruínas gregas e romanas',
        'Vilarejos costeiros tradicionais',
        'Culinária mediterrânea fresca',
      ],
      en: [
        'Crystal-clear beaches in Ksamil',
        'Butrint: Greek and Roman ruins',
        'Traditional coastal villages',
        'Fresh Mediterranean cuisine',
      ],
    },
    seasonalNotes: {
      pt: 'Junho a setembro para melhor experiência de praia.',
      en: 'June to September for best beach experience.',
    },
    image: '/programs/albanian-riviera.jpg',
  },
  {
    id: 'tunisia-heritage',
    title: {
      pt: 'Património da Tunísia',
      en: 'Tunisia Heritage',
    },
    operatorId: 'luxotour',
    destinations: ['Tunisia'],
    duration: 6,
    theme: 'cultural',
    highlights: {
      pt: [
        'Cartago e ruínas romanas',
        'Medina de Túnis UNESCO',
        'Sidi Bou Said: vila azul e branca',
        'Anfiteatro de El Djem',
      ],
      en: [
        'Carthage and Roman ruins',
        'UNESCO Tunis Medina',
        'Sidi Bou Said: blue and white village',
        'El Djem Amphitheatre',
      ],
    },
    seasonalNotes: {
      pt: 'Março a maio e setembro a novembro ideais.',
      en: 'March to May and September to November ideal.',
    },
    image: '/programs/tunisia-heritage.jpg',
  },
];
