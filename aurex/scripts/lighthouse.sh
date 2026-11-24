#!/usr/bin/env bash
# Measures performance, accessibility, best practices and SEO (mobile and desktop) for key pages.
# Usage: BASE_URL=http://127.0.0.1:3100 bash scripts/lighthouse.sh   (needs: npm i -g lighthouse, and CHROME_PATH)
BASE="${BASE_URL:-http://127.0.0.1:3100}"; OUT="${OUT_DIR:-/tmp/lh}"; mkdir -p "$OUT"
for u in fr fr/expertises/publicite-numerique-ppc fr/tarifs fr/calculateurs; do
  for f in mobile desktop; do
    extra=""; [ "$f" = desktop ] && extra="--preset=desktop"
    npx lighthouse "$BASE/$u" $extra --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless --no-sandbox" --output=json --output-path="$OUT/$(echo "$u" | tr / _)-$f.json" --quiet 2>/dev/null
  done
done
python3 - "$OUT" <<'PY'
import json,glob,sys
for f in sorted(glob.glob(sys.argv[1]+'/*.json')):
    d=json.load(open(f)); a=d['audits']
    c={k:round((v['score'] or 0)*100) for k,v in d['categories'].items()}
    print(f.split('/')[-1][:-5].ljust(52), c, 'LCP',a['largest-contentful-paint']['displayValue'],'CLS',a['cumulative-layout-shift']['displayValue'],'TBT',a['total-blocking-time']['displayValue'])
PY
