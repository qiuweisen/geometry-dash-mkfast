import { describe, expect, test } from 'vitest';

import {
  getD1Database,
  parseWranglerConfig,
} from '../../../scripts/parse-wrangler';

describe('Wrangler JSONC parsing', () => {
  test('preserves wildcard route strings while stripping comments', () => {
    const config = parseWranglerConfig();

    expect(getD1Database()?.name).toBe('geometry-dash-mkfast');
    expect(config).toMatchObject({
      name: 'geometry-dash-mkfast',
      account_id: '8db47976c18bf0ccb6e32d9671daedfb',
      workers_dev: true,
      d1_databases: [
        expect.objectContaining({ database_name: 'geometry-dash-mkfast' }),
      ],
      r2_buckets: [
        expect.objectContaining({ bucket_name: 'geometry-dash-mkfast-files' }),
      ],
    });
    expect(config).not.toHaveProperty('routes');
  });
});
