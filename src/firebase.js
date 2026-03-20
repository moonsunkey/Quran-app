// src/firebase.js
import { initializeApp }                               from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut as fbSignOut }                        from 'firebase/auth'
import { getFirestore, doc, setDoc,
         getDoc, onSnapshot }                          from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db   = getFirestore(app)

// Auth helpers
export const signUp   = (email, password) => createUserWithEmailAndPassword(auth, email, password)
export const signIn   = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const signOut  = ()                => fbSignOut(auth)

// Progress helpers
export const saveProgress = async (uid, surahKey, memorized) => {
  const ref = doc(db, 'users', uid, 'progress', surahKey)
  await setDoc(ref, { memorized, updatedAt: Date.now() }, { merge: true })
}

export const loadProgress = async (uid, surahKey) => {
  const ref  = doc(db, 'users', uid, 'progress', surahKey)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data().memorized : {}
}

export const subscribeProgress = (uid, surahKey, callback) => {
  const ref = doc(db, 'users', uid, 'progress', surahKey)
  return onSnapshot(ref, snap => {
    callback(snap.exists() ? snap.data().memorized : {})
  })
}
