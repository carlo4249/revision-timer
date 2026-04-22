// js/firebase-config.js

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyAMj3K7P5eLJZuIVwHZfJ0dITsCnKwNfXM",
  authDomain:        "revision-timer-bf5c8.firebaseapp.com",
  projectId:         "revision-timer-bf5c8",
  storageBucket:     "revision-timer-bf5c8.firebasestorage.app",
  messagingSenderId: "44515072496",
  appId:             "1:44515072496:web:b9b1f279beffe34d0ba535"
};

// Compare against placeholder string "YOUR_API_KEY_HERE" - NOT the actual key.
// This was the bug: the check was comparing the key against itself, always returning false.
const FIREBASE_ENABLED = FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY_HERE";

if (FIREBASE_ENABLED) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    window.firebaseAuth = firebase.auth();
    window.firebaseDb   = firebase.firestore();
    console.log("[Revision] Firebase initialised");
  } catch (e) {
    console.warn("[Revision] Firebase init failed:", e.message);
  }
} else {
  console.log("[Revision] Running in localStorage-only mode (no Firebase config)");
}
