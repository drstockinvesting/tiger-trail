/* Assembles the game's web bundle from the repo root into mobile/www/, which
   Capacitor packages into the Android app. No game-code changes — same files
   the desktop and web builds use. */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WWW = path.join(__dirname, 'www');

fs.rmSync(WWW, { recursive: true, force: true });
fs.mkdirSync(WWW);
for (const item of ['index.html', 'style.css', 'src', 'lib', 'manifest.webmanifest', 'sw.js', 'icons']) {
  fs.cpSync(path.join(ROOT, item), path.join(WWW, item), { recursive: true });
}
console.log('Web bundle copied into mobile/www/');
