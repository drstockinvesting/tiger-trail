# Tiger Trail: Jungle Math Runner 🐯

A 3D, Subway Surfers-style infinite runner that teaches **multiples** and **factors**.
A low-poly tiger sprints down a jungle trail collecting golden number coins —
collect numbers that match the target, dodge the ones that don't, and jump the logs.

Everything is self-contained: all 3D models, textures, and sounds are generated
procedurally in code. No build step, no internet connection, no external assets.

## Run it

Just open `index.html` in any modern browser (double-click works), or serve it:

```sh
python3 -m http.server 8421
# then visit http://localhost:8421
```

## Game modes

- **Multiples** — collect coins that are multiples of the target number shown at the top.
- **Factors** — collect coins that divide the target number evenly.

Each mode plays in one of two styles, picked on the main menu:

- **🏆 Competitive** — 3 lives, speed ramps up, scores reach the leaderboard
  and unlock achievements.
- **🌴 Casual** — a calm, constant pace with waves spaced farther apart for
  thinking time. No lives: wrong answers cost 10 points instead, and the run
  ends whenever the player presses ✖. Casual runs never touch the leaderboard,
  achievements, or lifetime records (per-fact practice stats still accumulate).

Wrong numbers are deliberately tricky near-misses (e.g. one more than a real
multiple). Correct values draw from a shuffled deck (×1–×12 for multiples, all
factors for factors mode) — a collected value never reappears in the round, but
ones that slip past come back so rounds end on real collection, not luck. A
round ends after 8 collected multiples, or after every factor is collected
(capped at 6 for factor-rich targets; primes like 7, 11, 13 need just 1 and
themselves). Targets cycle through a shuffled deck — all of 2–12 for multiples,
factor-rich numbers plus a few primes up to 144 for factors — so the whole K-12
fact grid gets assessed before anything repeats. Speed ramps up the longer you
survive.

## Controls

| Action | Desktop | Mobile |
|---|---|---|
| Change lane | ← / → (or A / D) | swipe left / right |
| Jump | Space (or ↑ / W) | swipe up |
| Tumble roll | ↓ (or S) | swipe down |
| Pause | P or Esc | ⏸ button |

Tip: you can jump *over* a wrong number to avoid it.

## Features

- 3 lives — wrong answers, log crashes, and vine tangles each cost one
- Obstacles stay rare by design: jump logs, tumble-roll under vine gates
- Combo streaks (×2 at 5, ×3 at 10) with escalating chime pitch
- Per-mode top-10 leaderboard with arcade-style initials entry
- Player statistics with **trouble spots** and **success spots** per fact family
- 63 achievements: 12 adventure goals plus per-fact-family mastery with visible
  progress (collect ×1–×12 of every number 2–12; find every factor of each
  factor target — cumulative across runs)
- Settings: sound, music, volume, graphics quality, number range (up to 9 or 12)
- In-game pause, settings, and exit buttons
- All progress stored locally in the browser (`localStorage`) — no accounts, no server

## Code layout

| File | Purpose |
|---|---|
| `index.html` | All screens/overlays + script loading |
| `style.css` | Jungle-themed responsive UI |
| `src/storage.js` | Save data: settings, leaderboards, stats, achievements |
| `src/audio.js` | All SFX + music, synthesized with Web Audio |
| `src/mathgen.js` | Target/correct/near-miss number generation |
| `src/tiger.js` | Procedural low-poly tiger model + run/jump animation |
| `src/world.js` | Jungle environment, number coins, log obstacles |
| `src/game.js` | Game loop, lanes, physics, spawning, collisions, scoring |
| `src/ui.js` | Screen navigation, HUD, leaderboard/stats rendering |
| `src/main.js` | Bootstrap |
| `lib/three.min.js` | Three.js r149 (vendored, classic build so `file://` works) |

## Desktop app (Mac + Windows)

The `desktop/` folder wraps the game in Electron and packages it with
[electron-builder](https://www.electron.build/). One config builds a **universal**
Mac app (Intel + Apple Silicon in a single download) and a Windows build, both
with the custom tiger icon. The game files are copied in automatically from the
repo root — no game-code changes.

```sh
cd desktop
npm install
npm run dist:mac    # → desktop/dist/  (.dmg + .zip, universal)
npm run dist:win    # → desktop/dist/  (Windows .zip)
npm run dist        # both at once
```

`npm start` runs the app unpackaged for quick testing.

**First launch on other Macs:** the build is unsigned (signing needs a $99/yr
Apple Developer account), so macOS Gatekeeper blocks a plain double-click the
first time — **right-click → Open → Open** (once per machine), or launch it
through the itch.io app, which bypasses Gatekeeper.

**Windows installer note:** a polished `.exe` installer (NSIS) requires Wine when
built on a Mac, so this config ships a portable Windows **`.zip`** (works on
itch.io as-is). For a real installer, either `brew install --cask wine-stable`
and add an `nsis` target, or build on a Windows machine / GitHub Actions runner.

### Selling on itch.io

itch.io gates the download behind payment automatically — no license code in the
game itself.

1. Create an account → **Dashboard → Create new project**.
2. Kind: **Downloadable**; Pricing: **Paid**, set a minimum price.
3. Upload `desktop/dist/Tiger Trail-<version>-universal.dmg` (or the Mac `.zip`)
   and the Windows `.zip`; mark each upload with its platform so itch shows the
   right download to each visitor.
4. For updates, install [butler](https://itch.io/docs/butler/) and:
   `butler push "desktop/dist/<file>" <user>/tiger-trail:mac` (and `:windows`).

## Web / PWA build (Chromebooks + any browser)

The game ships as an installable, **offline-capable Progressive Web App**. A
[`manifest.webmanifest`](manifest.webmanifest) + service worker
([`sw.js`](sw.js)) precache every asset (~252 KB total), so after the first load
it runs with no network — and browsers offer an **Install** button to add it to
the home screen / shelf like a native app. This is the build for **Chromebooks**
and reaches every other browser as a bonus.

The service worker only activates over `http(s)`; on `file://` (double-click) and
inside the Electron app it's silently skipped, so those keep working unchanged.

```sh
./build-web.sh        # → web-dist/tiger-trail-web.zip (index.html at the root)
```

**Selling / hosting:**

- **itch.io (HTML5):** create a project → Kind **HTML5**, upload
  `tiger-trail-web.zip`, tick *"This file will be played in the browser"*, set
  the viewport, and price it **Paid** — itch plays it in-browser only after
  purchase. (Note: inside itch's player the "install to home screen" prompt is
  limited; full PWA install works best when self-hosted.)
- **Your own site / Netlify / any static host:** unzip onto the host over HTTPS.
  Visitors get the **Install** button and full offline play. Gate access behind a
  Stripe/Gumroad purchase + download link for selling.
- **Free demo:** the same files can go on GitHub Pages (public, not paywalled).

## Android build (no Google Play account needed)

The `mobile/` folder wraps the game with [Capacitor](https://capacitorjs.com/),
and a GitHub Actions workflow ([`.github/workflows/android.yml`](.github/workflows/android.yml))
builds a **signed, installable APK in the cloud** — no local Android toolchain
and no Play Store account required. The APK can be sold as a direct download
(e.g. on itch.io) and sideloaded; it also runs on most Chromebooks. (The $25
Google Play account is only needed to *list* on the Play Store.)

**Build it:**

1. Push to `main` (or run the workflow manually: GitHub → **Actions → Build
   Android APK → Run workflow**).
2. Open the finished run → **Artifacts → `tiger-trail-android`** → download.
   It contains `Tiger-Trail.apk`.
3. Sell/distribute the APK. On a device, enable "install unknown apps" to
   sideload it.

**Signing:** by default the workflow generates a one-off keystore per run and
includes it (plus credentials) in the artifact. To ship **updates** that install
over an existing copy, the APK must keep the same key — save that keystore once
and add these repo secrets (GitHub → Settings → Secrets → Actions):
`KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`. Subsequent
builds then reuse it.

Local build is also possible (`cd mobile && npm install && npm run add:android`,
then open `android/` in Android Studio) but requires the Android SDK + JDK.

## iOS build (Mac + Xcode required)

The same `mobile/` Capacitor project targets iOS, and the game is verified
running on the iOS Simulator (Three.js/WebGL, audio, touch, and localStorage all
work under iOS WebKit). Building needs full **Xcode** and **CocoaPods**.

```sh
cd mobile
npm install
npm run add:ios            # scaffolds ios/ and runs pod install
# build + run in the iOS Simulator (no Apple account, no signing):
xcodebuild -workspace ios/App/App.xcworkspace -scheme App \
  -configuration Debug -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 17' \
  CODE_SIGNING_ALLOWED=NO build
```

> CocoaPods here was installed at user level for the system Ruby 2.6; if `pod`
> isn't found, add it to PATH: `export PATH="$(ruby -e 'puts Gem.user_dir')/bin:$PATH"`.

**Run on your own iPhone (free Apple ID, 7-day):** open
`mobile/ios/App/App.xcworkspace` in Xcode → select the **App** target →
**Signing & Capabilities** → pick your personal team → connect your iPhone and
press Run. The app expires after 7 days and **cannot be sold or shared** this way.

**Selling on the App Store requires the $99/year Apple Developer Program.** With
it, you archive the same project (Product → Archive) and upload to App Store
Connect / TestFlight. That paid enrollment is the only remaining gate — the build
itself is ready.
