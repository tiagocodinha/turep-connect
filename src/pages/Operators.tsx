import { ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { operators } from '@/data/operators';
import { Link } from 'react-router-dom';

export default function Operators() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('operators.title')}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('operators.subtitle')}
          </p>
        </div>

        {/* Operators Grid */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {operators.map((operator) => (
            <Card key={operator.id} id={operator.id} className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{operator.name}</CardTitle>
                    <p className="text-muted-foreground">{operator.description[language]}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="font-normal">
                      {operator.yearsExperience}+ {language === 'pt' ? 'anos' : 'years'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Destinations */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      {language === 'pt' ? 'Destinos' : 'Destinations'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {operator.destinations.map((dest) => (
                        <Badge key={dest} variant="secondary">
                          {dest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link to="/programs" className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        {t('operators.viewPrograms')}
                      </Button>
                    </Link>
                    <a
                      href={operator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full">
                        {t('operators.website')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
