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

## Packaging for sale (next steps)

The game is a static web bundle, so it wraps cleanly:

- **Desktop app**: wrap with [Electron](https://www.electronjs.org/) or
  [Tauri](https://tauri.app/) → sellable .app/.exe (Steam, itch.io, Gumroad).
- **Mobile app**: wrap with [Capacitor](https://capacitorjs.com/) → iOS App Store /
  Google Play. Touch controls and responsive layout are already implemented.
- **Web**: host as-is and gate behind a license/purchase page (itch.io supports
  HTML5 games directly).
