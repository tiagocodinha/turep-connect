import { useState, useMemo } from 'react';
import { ExternalLink, MapPin, Globe } from 'lucide-react';
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
import { agencies, Agency } from '@/data/agencies';

export default function Agencies() {
  const { t } = useLanguage();
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterOnline, setFilterOnline] = useState<string>('all');

  const regions = Array.from(new Set(agencies.map((a) => a.region)));

  const filteredAgencies = useMemo(() => {
    return agencies.filter((agency) => {
      if (filterRegion !== 'all' && agency.region !== filterRegion) return false;
      if (filterOnline === 'yes' && !agency.onlineBooking) return false;
      if (filterOnline === 'no' && agency.onlineBooking) return false;
      return true;
    });
  }, [filterRegion, filterOnline]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('agencies.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('agencies.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
          <Select value={filterRegion} onValueChange={setFilterRegion}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder={t('agencies.region')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('programs.filter.all')}</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterOnline} onValueChange={setFilterOnline}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder={t('agencies.onlineBooking')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('programs.filter.all')}</SelectItem>
              <SelectItem value="yes">Sim</SelectItem>
              <SelectItem value="no">Não</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency) => (
            <Card key={agency.id} className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">{agency.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">{agency.region}</Badge>
                  {agency.onlineBooking && (
                    <Badge variant="secondary">{t('agencies.onlineBooking')}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {agency.city}
                </div>

                <a
                  href={agency.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {t('agencies.visit')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAgencies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma agência encontrada com os filtros selecionados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
