# Quran Memorization App 🌙

A web app for new Muslims and non-Arabic speakers to memorize the Quran
surah by surah — with Arabic text, syllabified transliteration, English
translation, audio (Sheikh Al-Husary), and cloud-synced progress tracking.

---

## Stack

| Layer        | Technology                     |
|--------------|-------------------------------|
| Frontend     | React 18 + Vite               |
| Routing      | React Router v6               |
| Auth         | Firebase Authentication (Google) |
| Database     | Firestore (progress sync)     |
| Audio        | everyayah.com CDN (free)      |
| Hosting      | Vercel (free tier)            |

---

## 1. Local Setup (5 minutes)

```bash
# Clone or unzip the project
cd quran-app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start dev server
npm run dev
# → Opens at http://localhost:5173
```

The app works fully without Firebase in dev (progress saves to localStorage).
You only need Firebase for the Google sign-in + cross-device sync.

---

## 2. Firebase Setup (10 minutes)

### Create a Firebase project

1. Go to https://console.firebase.google.com
2. Click **Add project** → name it `quran-memorization` → Continue
3. Disable Google Analytics (not needed) → **Create project**

### Enable Google Auth

1. In Firebase Console → **Authentication** → **Get started**
2. Click **Google** provider → Enable → add your support email → **Save**

### Create Firestore database

1. **Firestore Database** → **Create database**
2. Choose **Start in test mode** (we'll tighten rules later) → Next
3. Pick any location (us-central1 is fine) → **Enable**

### Get your config keys

1. **Project Settings** (gear icon) → **Your apps** → **Web** (`</>`)
2. Register app name: `quran-web` → **Register**
3. Copy the `firebaseConfig` object values into your `.env.local`:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=quran-memorization.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=quran-memorization
VITE_FIREBASE_STORAGE_BUCKET=quran-memorization.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
```

### Firestore security rules (paste into Firestore → Rules)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own progress
    match /users/{userId}/progress/{surahKey} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 3. Deploy to Vercel (5 minutes)

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel

# Answer prompts:
# Set up and deploy? → Y
# Which scope? → your account
# Link to existing project? → N
# Project name? → quran-memorization
# Directory? → ./   (root)
# Override settings? → N
```

Then add your Firebase env vars in the Vercel dashboard:
**Project → Settings → Environment Variables** → add each `VITE_FIREBASE_*` key.

Redeploy: `vercel --prod`

### Option B — GitHub + Vercel (recommended for ongoing updates)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → **New Project** → import your repo
3. Add all `VITE_FIREBASE_*` environment variables
4. Click **Deploy**

Every `git push` auto-deploys. Free on Vercel's Hobby tier.

---

## 4. Adding a New Surah

1. Create `src/data/al-mulk.js` (copy `al-waqia.js` as template)
2. Fill in Arabic, transliteration, and translation for each ayah
3. In `src/pages/SurahPage.jsx`, import and register:
   ```js
   import { SECTIONS as AL_MULK_SECTIONS, SURAH_META as AL_MULK_META } from '../data/al-mulk'
   const SURAH_DATA_MAP = {
     'al-waqia': { sections: SECTIONS,          meta: SURAH_META      },
     'al-mulk':  { sections: AL_MULK_SECTIONS,  meta: AL_MULK_META    },
   }
   ```
4. In `src/pages/HomePage.jsx`, change `status: 'coming-soon'` → `status: 'available'`
5. Done — the full UI (Learn, Practice, Map, Progress) works automatically.

---

## 5. Audio

Audio is streamed for free from **everyayah.com** using this URL pattern:
```
https://everyayah.com/data/{reciterId}/{surah_3digits}{ayah_3digits}.mp3
```

The default reciter is **Mahmoud Khalil Al-Husary** (`Husary_128kbps`) —
slow, clear, ideal for new learners.

To change the reciter, update `reciterId` in the surah's `SURAH_META` object.
Other available IDs: `Alafasy_128kbps`, `Abdul_Basit_Murattal_192kbps`, `Minshawi_Murattal_128kbps`

---

## 6. Roadmap

- [ ] Al-Mulk (67) — great beginner surah, only 30 ayahs
- [ ] Al-Rahman (55) — beloved, with repeating refrain
- [ ] Ya-Sin (36)
- [ ] Al-Kahf (18)
- [ ] Pronunciation guide page
- [ ] Streak tracking (days practiced)
- [ ] Email/password auth option
- [ ] PWA / offline mode
- [ ] iOS & Android via Capacitor or React Native

---

## Project structure

```
quran-app/
├── index.html
├── vite.config.js
├── package.json
├── .env.example          ← copy to .env.local with your Firebase keys
└── src/
    ├── main.jsx           ← React entry + Router
    ├── App.jsx            ← Route definitions
    ├── firebase.js        ← Firebase init + helpers
    ├── hooks/
    │   ├── useAuth.js     ← Google sign-in state
    │   └── useProgress.js ← Firestore/localStorage sync
    ├── data/
    │   └── al-waqia.js    ← All 96 ayahs with transliteration
    ├── pages/
    │   ├── HomePage.jsx   ← Surah library
    │   └── SurahPage.jsx  ← Loads surah data by URL
    └── components/
        ├── Header.jsx     ← Nav + auth button
        └── SurahViewer.jsx ← Full 4-tab learning UI
```

---

بارك الله فيك — May Allah bless your efforts.
