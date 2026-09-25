import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('public site identity', () => {
  it('describes only the live Geometry Dash site in llms.txt', () => {
    const llms = readFileSync('public/llms.txt', 'utf8');

    expect(llms).toContain('https://play-geometry-dash.com');
    expect(llms).toContain('/game/geometry-dash-lite');
    expect(llms).toContain('/how-to-play-geometry-dash-lite');
    expect(llms).not.toMatch(/chartmini|trading|forex|crypto|stock/i);
  });

  it('keeps stale template locales and URLs out of published message copy', () => {
    for (const locale of ['en', 'zh-hans']) {
      const messages = JSON.parse(
        readFileSync(`project.inlang/messages/${locale}.json`, 'utf8')
      ) as Record<string, string>;
      const renderedPrefixes = [
        'home_body_',
        'home_call_to_action_',
        'home_faqs_',
        'home_features_',
        'home_hero_',
        'home_how_it_works_',
        'home_stats_',
        'site_',
      ];
      const publishedHomeCopy = Object.entries(messages)
        .filter(([key]) =>
          renderedPrefixes.some((prefix) => key.startsWith(prefix))
        )
        .map(([, value]) => value)
        .join('\n');

      expect(publishedHomeCopy).not.toMatch(
        /ChartMini|TradingView|trading simulator|交易者|交易模拟|股票|外汇|加密货币|TanStarter|Jane Doe|John Smith|SEO 内容/i
      );
    }
  });

  it('does not publish another product’s ad publisher declaration', () => {
    expect(() => readFileSync('public/ads.txt', 'utf8')).toThrow();
  });
});
