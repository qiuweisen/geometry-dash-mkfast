import { createFileRoute } from '@tanstack/react-router';
import Container from '@/components/layout/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { seo } from '@/lib/seo';
import { m } from '@/locale/paraglide/messages';

export const Route = createFileRoute('/(pages)/contact')({
  head: () => {
    const metadata = seo('/contact', {
      title: 'Contact | Play Geometry Dash',
      description: 'Contact information for the Play Geometry Dash website.',
    });
    return {
      ...metadata,
      meta: [...metadata.meta, { name: 'robots', content: 'noindex, follow' }],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <Container className="px-4 py-16">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {m.contact_title()}
          </h1>
          <p className="text-lg text-muted-foreground">
            {m.contact_description()}
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Contact information</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              A public support email and contact form are not configured for
              this website yet. Please do not send personal information through
              an unverified contact channel.
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
