#!/usr/bin/env bash
# Packages the web/PWA build into web-dist/tiger-trail-web.zip — ready to upload
# to itch.io as an HTML5 game, or unzip onto any static host (Netlify, your own
# server, etc.). index.html sits at the zip root, as itch.io requires.
set -euo pipefail
cd "$(dirname "$0")"

OUT_DIR="web-dist"
ZIP="$OUT_DIR/tiger-trail-web.zip"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

zip -r -X "$ZIP" \
  index.html style.css manifest.webmanifest sw.js \
  src lib icons \
  -x '*.DS_Store' '* [0-9].*' >/dev/null

echo "Built $ZIP ($(du -h "$ZIP" | cut -f1))"
echo "Upload to itch.io as an HTML5 game (check 'This file will be played in the browser')."
