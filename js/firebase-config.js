// js/firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyAMj3K7P5eLJZuIVwHZfJ0dITsCnKwNfXM",
  authDomain: "revision-timer-bf5c8.firebaseapp.com",
  projectId: "revision-timer-bf5c8",
  storageBucket: "revision-timer-bf5c8.firebasestorage.app",
  messagingSenderId: "44515072496",
  appId: "1:44515072496:web:b9b1f279beffe34d0ba535",
  measurementId: "G-W7KPR2Y7ZF"
};

// BUG FIX: `const` at top-level script scope does NOT attach to `window`,
// so window.FIREBASE_ENABLED was always undefined. Use window.X = ... explicitly.
window.FIREBASE_ENABLED = FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY_HERE";
window.firebaseAuth     = null;
window.firebaseDb       = null;

if (window.FIREBASE_ENABLED) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    window.firebaseAuth = firebase.auth();
    window.firebaseDb   = firebase.firestore();
    console.log("[Revision] Firebase initialised");
  } catch (e) {
    // Init failed -- fall back to localStorage-only mode
    window.FIREBASE_ENABLED = false;
    window.firebaseAuth     = null;
    window.firebaseDb       = null;
    console.warn("[Revision] Firebase init failed:", e.message);
  }
} else {
  console.log("[Revision] Running in localStorage-only mode (no Firebase config)");
}
