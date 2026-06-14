# Kis István · Coaching — weboldal

Profi, statikus (build nélküli) egyoldalas weboldal üzleti és vezetői coaching szolgáltatáshoz.
Nincs függőség, nincs build lépés — sima HTML + CSS + egy kevés JavaScript. Bárhol elérhető.

---

## 📁 Fájlszerkezet

```
coaching.istvankis.com/
├── index.html          # A teljes főoldal (minden szekció)
├── styles.css          # Designrendszer (navy/kék paletta, tipográfia, komponensek)
├── script.js           # Interakciók (menü, animációk, GYIK, űrlap, Cal popup)
├── assets/
│   ├── favicon.svg / favicon.ico / favicon-32.png / apple-touch-icon.png   # ikonok
│   ├── isti-portrait.jpg   # hero portré (fejléc)
│   ├── isti-speaking.jpg   # „Rólam" szekció – fellépős fotó
│   └── og-image.jpg        # közösségi megosztási kép (1200×630)
└── README.md
```

## 👀 Előnézet helyben

```bash
cd /Users/isti/code/coaching.istvankis.com
python3 -m http.server 8080
# majd: http://localhost:8080
```

## 🚀 Közzététel a `coaching.istvankis.com` címen

Statikus oldal → bármelyik megoldás működik: **Cloudflare Pages / Netlify / Vercel / GitHub Pages**,
vagy saját tárhely. A `coaching` aldomainhez a DNS-ben egy `CNAME` (vagy `A`) rekord kell.

---

## ✏️ Testreszabás — a legfontosabbak

### 1. Kapcsolati űrlap bekötése (Formspree) ⚠️ — ezt kell beállítani
Az oldalon **nincs kiírt e-mail-cím**; a kapcsolat az űrlapon keresztül megy, amely mögé
[Formspree](https://formspree.io) van előkészítve (ingyenes csomaggal is működik):

1. Regisztrálj a formspree.io-n, és hozz létre egy új űrlapot a **te e-mail-címeddel** (ide érkeznek majd az üzenetek — a cím nem jelenik meg a weboldalon).
2. Kapsz egy azonosítót, pl. `xeqwabcd`.
3. Az `index.html`-ben cseréld ki a helyőrzőt:
   ```html
   <form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST" ...>
   ```
   a `YOUR_FORM_ID` helyére írd a saját azonosítódat.

Amíg ez nincs beállítva, az űrlap jelzi, hogy „még nincs bekötve". A küldés AJAX-os
(oldal-újratöltés nélkül), van spam-csapda (honeypot) és „köszönöm" visszajelzés.

### 2. Fotók
Két fotó szerepel (mindkettő négyzetes JPEG):
- `assets/isti-portrait.jpg` — a fejléc (hero) portré,
- `assets/isti-speaking.jpg` — a „Rólam" szekció fellépős képe (középre vágva).
Cseréld a fájlokat ugyanezekkel a nevekkel, vagy frissítsd a hivatkozást az `index.html`-ben.

### 3. Időpontfoglalás (Cal.com)
A foglalós gombok a `https://cal.com/istvankis/coaching` naptárat nyitják meg **popup/overlay** módban,
a Cal.com beágyazott embedjével (a `</body>` előtti `Cal("init", ...)` script + a gombokon a
`data-cal-link="istvankis/coaching"` attribútum). A `script.js` egy `preventDefault`-tal biztosítja,
hogy az oldal elhagyása helyett a modal nyíljon (a `href` no-JS fallbackként marad). Ha változik a
naptár, keresd az `index.html`-ben a `cal.com/istvankis/coaching` / `istvankis/coaching` előfordulásokat.

### 4. Árak
Szándékosan nincs konkrét ár (a GYIK „Mennyibe kerül?" pontja az ismerkedő beszélgetésre utal).
Ha szeretnél árakat/csomagokat, a GYIK-szekció a jó hely rá.

### 5. Vélemények (ajánlott, ha lesz)
Az `index.html`-ben van egy **kész, de kikommentezett** „Vélemények" szekció. Amint van 2-3 *valódi*,
engedéllyel közölhető ügyfélvéleményed, vedd ki a `<!-- ... -->` jelölést, és töltsd ki.

### 6. Színek / betűtípus
A teljes paletta a `styles.css` tetején, CSS-változókban van (`:root`): brand-kék `--brand`,
sötét navy `--navy`, meleg arany akcent `--gold`, háttér `--bg`. Egy helyen átírva az egész oldal átszíneződik.
A címsorok betűje a **Source Serif 4**, a szövegé az **Inter** (a `--font-display` / `--font-sans` változókban).

### 7. Szövegek, megszólítás
A szövegek tegező, meleg–professzionális hangvételűek. Ha inkább magázódnál (Ön), szólj, és átírom.

### 8. Etikai megfogalmazás (fontos)
Az oldal mindenhol **„ICF-képzésben lévő coach"-ként** hivatkozik rád, nem kész „coach"-ként —
ez tudatos, etikus döntés. Amikor megszerzed a PCC-minősítést, ezeket a megfogalmazásokat
(hero, badge, footer, GYIK, `<title>`, meta) érdemes frissíteni.

---

## 🖼️ Közösségi megosztási kép
Az `assets/og-image.jpg` (1200×630) automatikusan megjelenik a link megosztásakor (LinkedIn, Messenger stb.).
Ha cseréled a fotót vagy a szöveget, a kép újragenerálható — szólj, és elkészítem.

---

## ✅ Élesítés előtti checklist

- [ ] **Formspree-azonosító** beírva az `index.html` `<form action="...">` attribútumába
- [ ] Fotók rendben (vagy lecserélve)
- [ ] `cal.com/istvankis/coaching` foglalási naptár él és helyes
- [ ] (opcionális) Vélemények szekció bekapcsolva valódi idézetekkel
- [ ] DNS: `coaching` aldomain a tárhely felé irányítva

---

*Készült build nélküli statikus oldalként, hogy egyszerű legyen üzemeltetni és gyorsan betöltsön.*
