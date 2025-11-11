import { useState, useMemo } from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { programs } from '@/data/programs';
import { operators } from '@/data/operators';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { agencies } from '@/data/agencies';
import { Link } from 'react-router-dom';

export default function Programs() {
  const { language, t } = useLanguage();
  const [filterOperator, setFilterOperator] = useState<string>('all');
  const [filterTheme, setFilterTheme] = useState<string>('all');

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      if (filterOperator !== 'all' && program.operatorId !== filterOperator) return false;
      if (filterTheme !== 'all' && program.theme !== filterTheme) return false;
      return true;
    });
  }, [filterOperator, filterTheme]);

  const getOperatorName = (operatorId: string) => {
    return operators.find((op) => op.id === operatorId)?.name || operatorId;
  };

  const themeLabels = {
    cultural: language === 'pt' ? 'Cultural' : 'Cultural',
    nature: language === 'pt' ? 'Natureza' : 'Nature',
    beach: language === 'pt' ? 'Praia' : 'Beach',
    'city-break': language === 'pt' ? 'City Break' : 'City Break',
    escorted: language === 'pt' ? 'Tour Guiado' : 'Escorted Tour',
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('programs.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          <Select value={filterOperator} onValueChange={setFilterOperator}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder={t('programs.filter.operator')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('programs.filter.all')}</SelectItem>
              {operators.map((op) => (
                <SelectItem key={op.id} value={op.id}>
                  {op.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterTheme} onValueChange={setFilterTheme}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder={t('programs.filter.theme')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('programs.filter.all')}</SelectItem>
              {Object.entries(themeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow animate-fade-in overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <MapPin className="h-16 w-16 text-primary/40" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{program.title[language]}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{getOperatorName(program.operatorId)}</Badge>
                  <Badge variant="secondary">{themeLabels[program.theme]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {program.duration} {t('programs.duration')}
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold mb-2">
                    {language === 'pt' ? 'Destaques' : 'Highlights'}:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {program.highlights[language].slice(0, 3).map((highlight, idx) => (
                      <li key={idx} className="line-clamp-1">• {highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        {t('programs.whereToBuy')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{t('programs.whereToBuy')}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        {agencies.map((agency) => (
                          <div key={agency.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">{agency.name}</h4>
                                <p className="text-sm text-muted-foreground">{agency.city}, {agency.region}</p>
                              </div>
                              {agency.onlineBooking && (
                                <Badge variant="secondary">{t('agencies.onlineBooking')}</Badge>
                              )}
                            </div>
                            <a
                              href={agency.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {t('agencies.visit')} →
                            </a>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Link to="/contact">
                    <Button variant="outline" className="w-full">
                      {t('programs.requestInfo')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'pt' ? 'Nenhum programa encontrado com os filtros selecionados.' : 'No programs found with the selected filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
