import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/how-to-play-geometry-dash-lite')({
  head: () =>
    seo('/how-to-play-geometry-dash-lite', {
      title: 'How to Play Geometry Dash Lite | Controls and Tips',
      description:
        'Learn Geometry Dash Lite keyboard and mobile controls, browser requirements, and troubleshooting steps.',
    }),
  component: HowToPlayPage,
});

function HowToPlayPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
        Game guide
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        How to Play Geometry Dash Lite
      </h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        Use precise timing to jump over obstacles and keep the cube moving.
        Geometry Dash Lite works on desktop and mobile browsers.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold">Desktop controls</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Press Space, Up Arrow, or click inside the game to jump. Release and
            wait for the next obstacle before jumping again.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Mobile controls</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Tap the game area to jump. Rotate your device to landscape for a
            wider play area when supported.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">If the game does not load</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Wait for the player to finish loading, enable WebGL, disable
            aggressive script blocking, or try a current version of Chrome,
            Safari, Edge, or Firefox.
          </p>
        </section>
      </div>
    </main>
  );
}
