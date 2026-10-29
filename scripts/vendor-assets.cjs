const { cpSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');
const root = join(__dirname, '..');
const source = join(root, 'node_modules/@fortawesome/fontawesome-free');
const target = join(root, 'source/vendor/fontawesome');
mkdirSync(target, { recursive: true });
for (const item of ['css', 'webfonts', 'LICENSE.txt']) {
  cpSync(join(source, item), join(target, item), { recursive: true });
}
