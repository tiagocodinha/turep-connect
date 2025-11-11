export interface NewsItem {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  excerpt: {
    pt: string;
    en: string;
  };
  source: string;
  date: string;
  link: string;
  image: string;
}

export const news: NewsItem[] = [
  {
    id: 'morocco-tourism-growth',
    title: {
      pt: 'Turismo em Marrocos Cresce 15% em 2024',
      en: 'Morocco Tourism Grows 15% in 2024',
    },
    excerpt: {
      pt: 'Marrocos registou um aumento significativo no turismo internacional, com destaque para visitantes europeus interessados em experiências culturais autênticas.',
      en: 'Morocco registered significant growth in international tourism, highlighting European visitors interested in authentic cultural experiences.',
    },
    source: 'Travel Weekly',
    date: '2024-10-15',
    link: 'https://example.com/morocco-growth',
    image: '/news/morocco-growth.jpg',
  },
  {
    id: 'albania-emerging',
    title: {
      pt: 'Albânia Eleita Destino Emergente do Ano',
      en: 'Albania Named Emerging Destination of the Year',
    },
    excerpt: {
      pt: 'A Albânia foi reconhecida como um dos destinos mais promissores da Europa, combinando praias mediterrâneas com património cultural único.',
      en: 'Albania was recognized as one of Europe\'s most promising destinations, combining Mediterranean beaches with unique cultural heritage.',
    },
    source: 'Lonely Planet',
    date: '2024-09-28',
    link: 'https://example.com/albania-emerging',
    image: '/news/albania-emerging.jpg',
  },
  {
    id: 'balkans-multi-country',
    title: {
      pt: 'Tours Multi-País nos Balcãs em Alta',
      en: 'Multi-Country Balkan Tours on the Rise',
    },
    excerpt: {
      pt: 'Viajantes procuram cada vez mais experiências que combinem vários países dos Balcãs numa única viagem, explorando a diversidade da região.',
      en: 'Travelers increasingly seek experiences combining multiple Balkan countries in one trip, exploring the region\'s diversity.',
    },
    source: 'Travel Trade Gazette',
    date: '2024-08-12',
    link: 'https://example.com/balkans-tours',
    image: '/news/balkans-tours.jpg',
  },
  {
    id: 'luxotour-expansion',
    title: {
      pt: 'Luxotour Expande Programas no Norte de África',
      en: 'Luxotour Expands North Africa Programs',
    },
    excerpt: {
      pt: 'A Luxotour anuncia novos itinerários na Tunísia e Argélia, reforçando a sua posição como líder em viagens no Norte de África.',
      en: 'Luxotour announces new itineraries in Tunisia and Algeria, reinforcing its position as North Africa travel leader.',
    },
    source: 'Tourism Today',
    date: '2024-07-05',
    link: 'https://example.com/luxotour-expansion',
    image: '/news/luxotour-expansion.jpg',
  },
];
