import { Award, Globe, Handshake, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-2xl text-primary font-semibold mb-6">{t('about.subtitle')}</p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">{t('about.mission.title')}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.mission.text')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">{t('about.experience.title')}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('about.experience.text')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What We Represent */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t('about.experience.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    {t('about.experience.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Décadas de experiência no mercado português
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Handshake className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    Parcerias Sólidas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Relacionamentos estabelecidos com principais agências
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">
                    Destinos Únicos
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Especialização em mercados emergentes e consolidados
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Work With Us CTA */}
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">{t('about.workWithUs.title')}</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('about.workWithUs.text')}
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {t('cta.contact')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
