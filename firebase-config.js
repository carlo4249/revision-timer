// js/firebase-config.js
// Fill in your Firebase project details below.
// Leave apiKey as "YOUR_API_KEY_HERE" to run in localStorage-only mode (no sign-in required).
//
// To get a config:
//   1. Go to console.firebase.google.com
//   2. Create a project, then add a Web app
//   3. Copy the config object values here
//   4. In Firebase console: Authentication -> Sign-in method -> enable Email/Password and Google
//   5. In Firebase console: Firestore Database -> Create database (start in production mode)
//   6. Add your GitHub Pages domain to Authentication -> Settings -> Authorised domains
//      e.g. yourusername.github.io

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyAMj3K7P5eLJZuIVwHZfJ0dITsCnKwNfXM",
  authDomain:        "revision-timer-bf5c8.firebaseapp.com",
  projectId:         "revision-timer-bf5c8",
  storageBucket:     "revision-timer-bf5c8.firebasestorage.app",
  messagingSenderId: "44515072496",
  appId:             "1:44515072496:web:b9b1f279beffe34d0ba535"
};

// Automatically detected: if no real config is present, skip Firebase and use localStorage only.
const FIREBASE_ENABLED = FIREBASE_CONFIG.apiKey !== "AIzaSyAMj3K7P5eLJZuIVwHZfJ0dITsCnKwNfXM";

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
