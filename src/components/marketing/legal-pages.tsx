import Container from '@/components/layout/container';
import { HeaderSection } from '@/components/shared/header-section';
import { Card, CardContent } from '@/components/ui/card';

type LegalSection = {
  title: string;
  paragraphs: string[];
};

function LegalDocument({
  title,
  sections,
}: {
  title: string;
  sections: LegalSection[];
}) {
  return (
    <Container className="px-4 py-10 md:py-16">
      <div className="mx-auto max-w-4xl">
        <HeaderSection
          subtitle={title}
          subtitleAs="h1"
          className="mb-8"
          subtitleClassName="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
        />
        <Card>
          <CardContent className="p-6 sm:p-10">
            <article className="prose prose-neutral max-w-none dark:prose-invert">
              <p>
                This page describes the current website at
                play-geometry-dash.com. It is general information, not legal
                advice. The website operator's legal name and a support contact
                have not yet been published.
              </p>
              {sections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </article>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

const privacySections: LegalSection[] = [
  {
    title: 'Information handled by this website',
    paragraphs: [
      'The public game pages do not require an account and this release does not offer sign-in, payments, or a contact form. The site may use browser storage for basic preferences such as language or appearance.',
      'The site is delivered using Cloudflare infrastructure. Like other hosting providers, Cloudflare may process technical request information to deliver, secure, and operate the service. Refer to Cloudflare’s privacy documentation for information about its processing.',
    ],
  },
  {
    title: 'The embedded game',
    paragraphs: [
      'The game is loaded in an iframe from a separate Cloudflare R2-hosted player. Loading or using it may cause the browser to request files from that player hostname. The game may also use browser storage required by the game itself.',
    ],
  },
  {
    title: 'Your choices and questions',
    paragraphs: [
      'You can clear browser storage or block third-party and embedded content using your browser settings. A public privacy contact has not yet been configured; this policy should be updated with the responsible operator identity and a working privacy contact before formal compliance use.',
    ],
  },
];

const userAgreementSections: LegalSection[] = [
  {
    title: 'Website and game access',
    paragraphs: [
      'This website provides informational pages and access to an embedded browser game. The game is hosted separately from the website. Availability, compatibility, and behavior may vary by device, browser, and network.',
      'Use the website lawfully and do not attempt to disrupt the site, bypass technical protections, or misuse its infrastructure.',
    ],
  },
  {
    title: 'Third-party intellectual property',
    paragraphs: [
      'Geometry Dash and Geometry Dash Lite names, marks, and game content belong to their respective rights holders. This website is independent and does not claim official status, endorsement, or ownership of those rights. Nothing on this website grants permission to copy, redistribute, or commercially use third-party material.',
    ],
  },
  {
    title: 'Availability and changes',
    paragraphs: [
      'The website and embedded game are provided as available and may change or be unavailable. Applicable law may provide rights that cannot be excluded by these general terms.',
      'The website operator’s legal identity and a contact for legal notices have not yet been published. This document is a transparent interim notice and should be replaced with reviewed terms before the site is treated as a fully documented commercial service.',
    ],
  },
];

export function PrivacyPolicyPage() {
  return <LegalDocument title="Privacy Policy" sections={privacySections} />;
}

export function UserAgreementPage() {
  return (
    <LegalDocument title="User Agreement" sections={userAgreementSections} />
  );
}
