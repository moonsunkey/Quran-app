# Quran Memorization App 🌙

A web app for new Muslims and non-Arabic speakers to memorize the Quran
surah by surah — with Arabic text, colour-coded transliteration, multi-language
translation, audio recitation, and cloud-synced progress tracking.

**Live site:** https://quranmemo.app  
**Repo:** github.com/YOUR_USERNAME/quran-app

---

## Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React 18 + Vite                     |
| Routing      | React Router v6                     |
| Auth         | Firebase Authentication (email/password) |
| Database     | Firestore (progress sync)           |
| Audio        | everyayah.com CDN                   |
| Hosting      | Vercel (free tier, auto-deploy from GitHub) |

---

## Current Surahs

| Surah | Number | Ayahs | Status |
|-------|--------|-------|--------|
| Al-Fatiha | 1 | 7 | ✓ Available — includes word-by-word + EN/ZH/HI |
| Al-Mulk | 67 | 30 | ✓ Available — EN/ZH/HI |
| Al-Waqia | 56 | 96 | ✓ Available — EN/ZH/HI |
| Al-Rahman | 55 | 78 | Coming soon |
| Ya-Sin | 36 | 83 | Coming soon |
| Al-Kahf | 18 | 110 | Coming soon |

---

## Features

- **4 learning tabs** per surah: Learn · Practice · Map · Progress
- **Colour-coded transliteration** — gold (normal) · teal (stretch long vowel) · orange (hard sound)
- **3 language toggles** — EN / 中文 (Simplified Chinese) / हिंदी (Hindi) — any combination
- **Word-by-word breakdown** — tap ▼ on any ayah to see each Arabic word with transliteration + all translations
- **Audio playback** — 4 reciters: Al-Husary (default) · Al-Afasy · Abdul Basit · Al-Minshawi
- **Auto-play** — plays through a whole section, screen auto-scrolls and highlights current ayah
- **Practice mode** — hide Arabic / transliteration / translation to test memory
- **Progress tracking** — per-ayah checkboxes, section completion, home page progress bars
- **Cloud sync** — sign in to sync progress across all devices
- **Pronunciation guide** — full 📚 tab explaining all 30 Arabic sounds with English tips
- **PWA-ready** — add to home screen on iPhone/Android, works like a native app
- **Trilingual About page** — personal story + full how-to guide in EN / 中文 / हिंदी

---

## 1. Local Setup

```bash
cd quran-app
npm install
# Create .env.local with your Firebase keys (see section 2)
npm run dev
# → http://localhost:5173
```

Progress saves to localStorage without Firebase. Firebase only needed for cross-device sync.

---

## 2. Firebase Setup

### Create project
1. https://console.firebase.google.com → **Add project** → name it → disable Analytics → Create

### Enable Email/Password auth
1. **Authentication** → **Get started** → **Email/Password** → Enable → Save

### Create Firestore
1. **Firestore Database** → **Create database** → **Start in test mode** → Enable

### Get config keys
1. **Project Settings** → **Your apps** → **Web** (`</>`) → Register → copy config

### Create `.env.local` in project root
```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
```

### Firestore security rules
Paste into **Firestore → Rules → Edit rules**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/progress/{surahKey} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Add Vercel domain to Firebase authorized domains
**Authentication → Settings → Authorized domains → Add domain** → `quranmemo.app`

---

## 3. Deployment

**Auto-deploy via GitHub (already set up):**
```bash
git add .
git commit -m "Your message"
git push
# Vercel picks it up automatically — deploys in ~60 seconds
```

**Always run `npm run build` before pushing** — catches all errors locally before they reach Vercel.

**If Vercel doesn't auto-deploy:** Settings → Git → confirm main branch is connected.

**Environment variables on Vercel:**
Project → Settings → Environment Variables → add all 6 `VITE_FIREBASE_*` keys.

---

## 4. Adding a New Surah

**Always use `SURAH_TEMPLATE.js` as your starting point.** It has all the rules.

### Step 1 — Create the data file
Copy `src/data/SURAH_TEMPLATE.js` → rename to `src/data/al-xxx.js`

**Critical quote rules (every rule exists because it broke a build):**

| Field | Quote type | Example |
|-------|-----------|---------|
| `ar:` | Single `'...'` | `ar:'بِسْمِ ٱللَّهِ'` |
| `tr:` | **Double `"..."`** | `tr:"Bis-mil-laa-hir  raH-maa-nir"` |
| `en:` | Single `'...'` (double if has apostrophe) | `en:'Guide us'` |
| `zh:` | **Double `"..."`** | `zh:"奉真主之名"` |
| `hi:` | **Double `"..."`** | `hi:"अल्लाह के नाम से"` |
| `memTip:` | Backticks `` `...` `` | `` memTip: `Allah's mercy...` `` |
| `summary:` | Backticks if has apostrophe | `` summary: `He's the Lord...` `` |

### Step 2 — Register in SurahPage.jsx
```js
import { SECTIONS as AL_XXX_SECTIONS, SURAH_META as AL_XXX_META } from '../data/al-xxx'

const SURAH_DATA_MAP = {
  'al-fatiha': { sections: AL_FATIHA_SECTIONS, meta: AL_FATIHA_META },
  'al-waqia':  { sections: AL_WAQIA_SECTIONS,  meta: AL_WAQIA_META  },
  'al-mulk':   { sections: AL_MULK_SECTIONS,   meta: AL_MULK_META   },
  'al-xxx':    { sections: AL_XXX_SECTIONS,     meta: AL_XXX_META    }, // ← add this
}
```

### Step 3 — Add card in HomePage.jsx
Add to the `SURAHS` array:
```js
{
  id: 'al-xxx', number: XX, name: 'Al-Xxx',
  arabic: '...', meaning: '...', ayahs: XX,
  difficulty: 'Beginner', status: 'available',
  color: '#XXXXXX', description: '...'
},
```

### Step 4 — Test and push
```bash
npm run build        # must show ✓ built — fix any errors before pushing
git add .
git commit -m "Add Surah Al-Xxx (XX)"
git push
```

---

## 5. Audio

Audio streamed from **everyayah.com**:
```
https://everyayah.com/data/{reciterId}/{surah_3digits}{ayah_3digits}.mp3
```

Default reciter: **Mahmoud Khalil Al-Husary** (`Husary_128kbps`) — slow and clear, best for learners.

Available reciters:
- `Husary_128kbps` — Al-Husary (default)
- `Alafasy_128kbps` — Al-Afasy
- `Abdul_Basit_Murattal_192kbps` — Abdul Basit
- `Minshawi_Murattal_128kbps` — Al-Minshawi

`audioOffset`: total ayahs in all surahs before this one.
Find it at: `https://api.quran.com/api/v4/verses/by_key/{surah}:{ayah}`

---

## 6. Project Structure

```
quran-app/
├── index.html              ← SEO meta tags, PWA meta, favicon
├── vite.config.js
├── package.json
├── .env.local              ← Firebase keys (never commit this)
└── src/
    ├── main.jsx            ← React entry + Router
    ├── App.jsx             ← Route definitions + auth wiring
    ├── firebase.js         ← Firebase init + signIn/signUp/signOut + Firestore helpers
    ├── hooks/
    │   ├── useAuth.js      ← Email/password auth state
    │   └── useProgress.js  ← Firestore/localStorage progress sync
    ├── data/
    │   ├── SURAH_TEMPLATE.js  ← Copy this when adding a new surah
    │   ├── al-fatiha.js    ← 7 ayahs, word-by-word, EN/ZH/HI
    │   ├── al-mulk.js      ← 30 ayahs, EN/ZH/HI
    │   └── al-waqia.js     ← 96 ayahs, EN/ZH/HI
    ├── pages/
    │   ├── HomePage.jsx    ← Surah library with progress bars
    │   ├── SurahPage.jsx   ← Loads surah data by URL param
    │   └── AboutPage.jsx   ← Trilingual about page (EN/ZH/HI)
    └── components/
        ├── Header.jsx      ← Nav + sign in/register form
        └── SurahViewer.jsx ← Full learning UI:
                               - GuideTab (pronunciation guide)
                               - LearnTab (Arabic + transliteration + translation + audio)
                               - PracticeTab (hide/reveal layers)
                               - MapTab (section overview, dynamic)
                               - ProgressTab (per-ayah grid + stats)
```

---

## 7. Roadmap

**Next surahs (priority order):**
- [ ] Al-Rahman (55) — 78 ayahs, repeating refrain, beloved
- [ ] Al-Fajr (89) — 30 ayahs, powerful imagery
- [ ] Ya-Sin (36) — heart of the Quran
- [ ] Al-Kahf (18) — recited on Fridays

**Features planned:**
- [ ] Daily streak tracker
- [ ] Google sign-in (OAuth fix)
- [ ] Firestore security rules tightened for production
- [ ] More languages (Urdu, Malay, Turkish)
- [ ] React Native / Expo mobile app (iOS + Android)
- [ ] Offline / PWA mode with service worker

---

## 8. Mobile App (Future)

The web app is PWA-ready (add to home screen works now).

Full native app planned via **React Native + Expo**:
- All surah data files reuse unchanged
- All hooks (useProgress, useAuth) reuse unchanged  
- Firebase Auth + Firestore work identically
- Only the UI components need rewriting (View/Text instead of div/span)
- Single codebase → iOS App Store + Google Play

---

بارك الله فيك — May Allah bless your efforts. آمين
