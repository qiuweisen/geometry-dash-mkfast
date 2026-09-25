import { createFileRoute } from '@tanstack/react-router';
import { PrivacyPolicyPage } from '@/components/marketing/legal-pages';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/privacy-policy')({
  head: () => {
    const metadata = seo('/privacy-policy', {
      title: 'Privacy Policy | Play Geometry Dash',
      description:
        'Interim privacy information about the Play Geometry Dash website and its embedded game.',
    });
    return {
      ...metadata,
      meta: [...metadata.meta, { name: 'robots', content: 'noindex, follow' }],
    };
  },
  component: PrivacyPolicyPage,
});
