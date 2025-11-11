import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header
    'nav.home': 'Início',
    'nav.operators': 'Operadores',
    'nav.programs': 'Programas',
    'nav.agencies': 'Agências',
    'nav.news': 'Notícias',
    'nav.about': 'Sobre',
    'nav.contact': 'Contacto',
    'cta.contact': 'Contactar Representações',
    
    // Home
    'home.hero.title': 'Ligamos Operadores Turísticos ao Mercado Português',
    'home.hero.subtitle': 'Representação especializada para operadores internacionais que procuram parceiros de distribuição em Portugal',
    'home.search.destination': 'Destino',
    'home.search.theme': 'Tema',
    'home.search.operator': 'Operador',
    'home.search.button': 'Pesquisar Programas',
    'home.howItWorks.title': 'Como Funciona',
    'home.step1.title': 'Escolha o Programa',
    'home.step1.desc': 'Explore programas de viagem únicos dos nossos operadores representados',
    'home.step2.title': 'Selecione a Agência',
    'home.step2.desc': 'Encontre agências parceiras certificadas em Portugal',
    'home.step3.title': 'Reserve Externamente',
    'home.step3.desc': 'Complete a sua reserva diretamente no website da agência',
    
    // Operators
    'operators.title': 'Operadores Representados',
    'operators.subtitle': 'Especialistas em destinos únicos com décadas de experiência',
    'operators.viewPrograms': 'Ver Programas',
    'operators.website': 'Visitar Website',
    
    // Programs
    'programs.title': 'Programas de Viagem',
    'programs.subtitle': 'Descubra experiências únicas nos nossos destinos especializados',
    'programs.filter.all': 'Todos',
    'programs.filter.operator': 'Operador',
    'programs.filter.destination': 'Destino',
    'programs.filter.theme': 'Tema',
    'programs.duration': 'dias',
    'programs.whereToBuy': 'Onde Comprar em Portugal',
    'programs.requestInfo': 'Solicitar Informação',
    
    // Agencies
    'agencies.title': 'Agências Parceiras',
    'agencies.subtitle': 'Agências de viagens certificadas em Portugal',
    'agencies.region': 'Região',
    'agencies.onlineBooking': 'Reserva Online',
    'agencies.visit': 'Visitar Website',
    
    // News
    'news.title': 'Notícias e Imprensa',
    'news.subtitle': 'Últimas novidades dos nossos operadores e destinos',
    'news.readMore': 'Ler Mais',
    
    // About
    'about.title': 'Sobre a TUREP',
    'about.subtitle': 'Turismo Único Representações',
    'about.mission.title': 'A Nossa Missão',
    'about.mission.text': 'A TUREP especializa-se em representar operadores turísticos internacionais no mercado português, criando pontes entre programas de viagem excecionais e agências de viagens locais.',
    'about.experience.title': 'Experiência Comprovada',
    'about.experience.text': 'Com décadas de experiência no setor do turismo, oferecemos conhecimento profundo do mercado português e relações estabelecidas com as principais agências de viagens.',
    'about.workWithUs.title': 'Trabalhe Connosco',
    'about.workWithUs.text': 'É um operador turístico que procura representação em Portugal? Contacte-nos para discutir oportunidades de parceria.',
    
    // Contact
    'contact.title': 'Entre em Contacto',
    'contact.subtitle': 'Estamos aqui para ajudar agências e clientes',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.company': 'Agência/Empresa',
    'contact.message': 'Mensagem',
    'contact.program': 'Programa de Interesse (opcional)',
    'contact.send': 'Enviar Mensagem',
    
    // Footer
    'footer.tagline': 'Representações turísticas de excelência em Portugal',
    'footer.quickLinks': 'Links Rápidos',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidade & Cookies',
    'footer.terms': 'Termos de Serviço',
    'footer.rights': 'Todos os direitos reservados',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.operators': 'Operators',
    'nav.programs': 'Programs',
    'nav.agencies': 'Agencies',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'cta.contact': 'Contact Representations',
    
    // Home
    'home.hero.title': 'Connecting Tour Operators to the Portuguese Market',
    'home.hero.subtitle': 'Specialized representation for international operators seeking distribution partners in Portugal',
    'home.search.destination': 'Destination',
    'home.search.theme': 'Theme',
    'home.search.operator': 'Operator',
    'home.search.button': 'Search Programs',
    'home.howItWorks.title': 'How It Works',
    'home.step1.title': 'Choose Program',
    'home.step1.desc': 'Explore unique travel programs from our represented operators',
    'home.step2.title': 'Select Agency',
    'home.step2.desc': 'Find certified partner agencies in Portugal',
    'home.step3.title': 'Book Externally',
    'home.step3.desc': 'Complete your booking directly on the agency website',
    
    // Operators
    'operators.title': 'Represented Operators',
    'operators.subtitle': 'Destination specialists with decades of experience',
    'operators.viewPrograms': 'View Programs',
    'operators.website': 'Visit Website',
    
    // Programs
    'programs.title': 'Travel Programs',
    'programs.subtitle': 'Discover unique experiences in our specialized destinations',
    'programs.filter.all': 'All',
    'programs.filter.operator': 'Operator',
    'programs.filter.destination': 'Destination',
    'programs.filter.theme': 'Theme',
    'programs.duration': 'days',
    'programs.whereToBuy': 'Where to Buy in Portugal',
    'programs.requestInfo': 'Request Information',
    
    // Agencies
    'agencies.title': 'Partner Agencies',
    'agencies.subtitle': 'Certified travel agencies in Portugal',
    'agencies.region': 'Region',
    'agencies.onlineBooking': 'Online Booking',
    'agencies.visit': 'Visit Website',
    
    // News
    'news.title': 'News & Press',
    'news.subtitle': 'Latest updates from our operators and destinations',
    'news.readMore': 'Read More',
    
    // About
    'about.title': 'About TUREP',
    'about.subtitle': 'Unique Tourism Representations',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'TUREP specializes in representing international tour operators in the Portuguese market, creating bridges between exceptional travel programs and local travel agencies.',
    'about.experience.title': 'Proven Experience',
    'about.experience.text': 'With decades of experience in the tourism sector, we offer deep knowledge of the Portuguese market and established relationships with leading travel agencies.',
    'about.workWithUs.title': 'Work With Us',
    'about.workWithUs.text': 'Are you a tour operator seeking representation in Portugal? Contact us to discuss partnership opportunities.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We are here to help agencies and clients',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.company': 'Agency/Company',
    'contact.message': 'Message',
    'contact.program': 'Program of Interest (optional)',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.tagline': 'Excellence in tourism representations in Portugal',
    'footer.quickLinks': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy & Cookies',
    'footer.terms': 'Terms of Service',
    'footer.rights': 'All rights reserved',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('turep-language');
    return (stored === 'en' ? 'en' : 'pt') as Language;
  });

  useEffect(() => {
    localStorage.setItem('turep-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
