/* Copies the game (index.html, style.css, src/, lib/) into desktop/game/ so
   Electron can load it. Packaging itself is done by electron-builder via the
   npm scripts (dist:mac / dist:win / dist). Run standalone with:
     node build.js --copy-only   (or `npm run copy`) */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GAME = path.join(__dirname, 'game');

function copyGame() {
  fs.rmSync(GAME, { recursive: true, force: true });
  fs.mkdirSync(GAME);
  for (const item of ['index.html', 'style.css', 'src', 'lib', 'manifest.webmanifest', 'icons']) {
    fs.cpSync(path.join(ROOT, item), path.join(GAME, item), { recursive: true });
  }
  console.log('Game files copied into desktop/game/');
}

copyGame();
