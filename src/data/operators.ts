export interface Operator {
  id: string;
  name: string;
  logo: string;
  description: {
    pt: string;
    en: string;
  };
  destinations: string[];
  website: string;
  yearsExperience: number;
}

export const operators: Operator[] = [
  {
    id: 'luxotour',
    name: 'Luxotour',
    logo: '/operators/luxotour.svg',
    description: {
      pt: 'Especialista em Marrocos e Norte de África com mais de 40 anos de experiência. Oferece programas culturais, tours no deserto, e experiências autênticas nas cidades imperiais.',
      en: 'Specialist in Morocco and North Africa with over 40 years of experience. Offers cultural programs, desert tours, and authentic experiences in imperial cities.',
    },
    destinations: ['Morocco', 'Tunisia', 'Algeria'],
    website: 'https://luxotour.com',
    yearsExperience: 42,
  },
  {
    id: 'albania-dmc',
    name: 'Albania DMC / Balkan Tour Operator',
    logo: '/operators/albania-dmc.svg',
    description: {
      pt: 'DMC líder na Albânia e operador especializado nos Balcãs. Programas multi-país que combinam história, natureza e gastronomia em destinos emergentes.',
      en: 'Leading DMC in Albania and specialized Balkan operator. Multi-country programs combining history, nature, and gastronomy in emerging destinations.',
    },
    destinations: ['Albania', 'Kosovo', 'North Macedonia', 'Montenegro', 'Serbia'],
    website: 'https://albaniadmc.com',
    yearsExperience: 15,
  },
];
