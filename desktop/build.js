/* Builds the Mac app:
   1. copies the game (index.html, style.css, src/, lib/) into desktop/game/
   2. packages it with Electron into desktop/dist/
   Run with `npm run build`; `--copy-only` just refreshes desktop/game/. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GAME = path.join(__dirname, 'game');

function copyGame() {
  fs.rmSync(GAME, { recursive: true, force: true });
  fs.mkdirSync(GAME);
  for (const item of ['index.html', 'style.css', 'src', 'lib']) {
    fs.cpSync(path.join(ROOT, item), path.join(GAME, item), { recursive: true });
  }
  console.log('Game files copied into desktop/game/');
}

async function build() {
  const { packager } = require('@electron/packager');
  const icon = path.join(__dirname, 'icon.icns');
  const out = await packager({
    dir: __dirname,
    name: 'Tiger Trail',
    platform: 'darwin',
    arch: 'universal',
    out: path.join(__dirname, 'dist'),
    overwrite: true,
    icon: fs.existsSync(icon) ? icon : undefined,
    appBundleId: 'com.drcole.tigertrail',
    appCategoryType: 'public.app-category.education',
    ignore: [/^\/dist($|\/)/, /^\/build\.js$/, /^\/icon\.(svg|icns)$/, /^\/icon\.iconset($|\/)/],
  });
  console.log('Packaged:', out.join(', '));
}

copyGame();
if (!process.argv.includes('--copy-only')) {
  build().catch((e) => { console.error(e); process.exit(1); });
}
