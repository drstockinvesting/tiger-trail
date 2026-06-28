/* Post-scaffold tweaks to the generated Android project:
   - lock the runner to landscape (best UX for a side-on runner)
   These run after `npx cap add android`, which creates the native project. */
const fs = require('fs');
const path = require('path');

const MANIFEST = path.join(__dirname, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');

if (!fs.existsSync(MANIFEST)) {
  // No Android platform present (e.g. an iOS-only sync) — nothing to patch.
  console.log('No Android project found — skipping Android manifest patch.');
  process.exit(0);
}

let xml = fs.readFileSync(MANIFEST, 'utf8');

if (!/android:screenOrientation/.test(xml)) {
  // add landscape lock to the main <activity ...> tag
  xml = xml.replace(
    /(<activity\b)([^>]*android:name="\.MainActivity"[^>]*)(>)/,
    '$1$2 android:screenOrientation="sensorLandscape"$3'
  );
  fs.writeFileSync(MANIFEST, xml);
  console.log('Locked MainActivity to sensorLandscape.');
} else {
  console.log('screenOrientation already set — leaving manifest as-is.');
}
