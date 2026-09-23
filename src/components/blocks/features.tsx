import { m } from '@/locale/paraglide/messages';
import Container from '@/components/layout/container';
import { HeaderSection } from '@/components/shared/header-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IconDeviceGamepad2,
  IconKeyboard,
  IconPlayerPlay,
  IconTrophy,
} from '@tabler/icons-react';

export default function FeaturesSection() {
  const items = [
    [
      IconPlayerPlay,
      m.home_features_items_item_1_title,
      m.home_features_items_item_1_description,
    ],
    [
      IconKeyboard,
      m.home_features_items_item_2_title,
      m.home_features_items_item_2_description,
    ],
    [
      IconDeviceGamepad2,
      m.home_features_items_item_3_title,
      m.home_features_items_item_3_description,
    ],
    [
      IconTrophy,
      m.home_features_items_item_4_title,
      m.home_features_items_item_4_description,
    ],
  ] as const;
  return (
    <section id="features" className="border-y bg-muted/20 px-4 py-16 md:py-24">
      <Container className="space-y-10 px-2 lg:space-y-14">
        <ScrollReveal>
          <HeaderSection
            titleAs="h2"
            title={m.home_features_title()}
            subtitle={m.home_features_subtitle()}
            description={m.home_features_description()}
          />
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon, title, description], index) => (
            <ScrollReveal key={title()} delay={index * 80}>
              <Card className="h-full bg-background/80 transition-transform hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{title()}</CardTitle>
                </CardHeader>
                <CardContent className="leading-6 text-muted-foreground">
                  {description()}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
