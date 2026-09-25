import { createFileRoute } from '@tanstack/react-router';
import { UserAgreementPage } from '@/components/marketing/legal-pages';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/user-agreement')({
  head: () => {
    const metadata = seo('/user-agreement', {
      title: 'User Agreement | Play Geometry Dash',
      description:
        'Interim use information for the Play Geometry Dash website and its embedded game.',
    });
    return {
      ...metadata,
      meta: [...metadata.meta, { name: 'robots', content: 'noindex, follow' }],
    };
  },
  component: UserAgreementPage,
});
