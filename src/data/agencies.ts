export interface Agency {
  id: string;
  name: string;
  region: 'Norte' | 'Centro' | 'Lisboa e Vale do Tejo' | 'Alentejo' | 'Algarve' | 'Madeira' | 'Açores';
  city: string;
  website: string;
  onlineBooking: boolean;
  email: string;
  phone: string;
}

export const agencies: Agency[] = [
  {
    id: 'viagens-abreu',
    name: 'Abreu - Agência de Viagens',
    region: 'Lisboa e Vale do Tejo',
    city: 'Lisboa',
    website: 'https://www.abreu.pt',
    onlineBooking: true,
    email: 'info@abreu.pt',
    phone: '+351 21 123 4567',
  },
  {
    id: 'topatlantic',
    name: 'Top Atlântico',
    region: 'Norte',
    city: 'Porto',
    website: 'https://www.topatlantic.pt',
    onlineBooking: true,
    email: 'geral@topatlantic.pt',
    phone: '+351 22 987 6543',
  },
  {
    id: 'solférias',
    name: 'Solférias',
    region: 'Algarve',
    city: 'Faro',
    website: 'https://www.solferias.pt',
    onlineBooking: true,
    email: 'reservas@solferias.pt',
    phone: '+351 289 123 456',
  },
  {
    id: 'azores-travel',
    name: 'Azores Travel Services',
    region: 'Açores',
    city: 'Ponta Delgada',
    website: 'https://www.azorestravel.pt',
    onlineBooking: false,
    email: 'info@azorestravel.pt',
    phone: '+351 296 234 567',
  },
  {
    id: 'madeira-tours',
    name: 'Madeira Tours & Travel',
    region: 'Madeira',
    city: 'Funchal',
    website: 'https://www.madeiratours.pt',
    onlineBooking: true,
    email: 'booking@madeiratours.pt',
    phone: '+351 291 345 678',
  },
  {
    id: 'coimbra-travel',
    name: 'Coimbra Travel Agency',
    region: 'Centro',
    city: 'Coimbra',
    website: 'https://www.coimbratravel.pt',
    onlineBooking: false,
    email: 'geral@coimbratravel.pt',
    phone: '+351 239 456 789',
  },
  {
    id: 'alentejo-tours',
    name: 'Alentejo Tours',
    region: 'Alentejo',
    city: 'Évora',
    website: 'https://www.alentejotours.pt',
    onlineBooking: false,
    email: 'info@alentejotours.pt',
    phone: '+351 266 567 890',
  },
];
