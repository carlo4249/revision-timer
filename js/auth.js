// js/auth.js
// Handles the auth.html page: sign in, sign up, Google OAuth

document.addEventListener('DOMContentLoaded', () => {
  // If Firebase not configured, skip auth entirely
  if (!window.FIREBASE_ENABLED) {
    window.location.href = 'index.html';
    return;
  }

  // If already signed in, go straight to app
  window.firebaseAuth.onAuthStateChanged(user => {
    if (user) window.location.href = 'index.html';
  });

  applyAuthTheme();
});

function applyAuthTheme() {
  let t = 'dark';
  try { t = localStorage.getItem('rv_theme') || 'dark'; } catch(e) {}
  document.documentElement.setAttribute('data-theme', t);
}

// -- Toggle between sign-in and sign-up views --
let authMode = 'signin';
function switchMode(mode) {
  authMode = mode;
  document.getElementById('signin-panel').style.display = mode === 'signin' ? 'block' : 'none';
  document.getElementById('signup-panel').style.display = mode === 'signup' ? 'block' : 'none';
  document.getElementById('tab-signin').classList.toggle('active', mode === 'signin');
  document.getElementById('tab-signup').classList.toggle('active', mode === 'signup');
  clearAuthError();
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
}
function clearAuthError() {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}

function setLoading(loading) {
  document.querySelectorAll('.auth-submit-btn').forEach(btn => {
    btn.disabled = loading;
    btn.textContent = loading ? 'Please wait...' : btn.dataset.label;
  });
}

// -- Email sign-in --
async function signIn() {
  const email    = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;
  if (!email || !password) { showAuthError('Please fill in all fields.'); return; }
  clearAuthError(); setLoading(true);
  try {
    await window.firebaseAuth.signInWithEmailAndPassword(email, password);
    window.location.href = 'index.html';
  } catch (e) {
    setLoading(false);
    showAuthError(friendlyAuthError(e.code));
  }
}

// -- Email sign-up --
async function signUp() {
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm  = document.getElementById('signup-confirm').value;
  if (!email || !password) { showAuthError('Please fill in all fields.'); return; }
  if (password !== confirm) { showAuthError('Passwords do not match.'); return; }
  if (password.length < 6)  { showAuthError('Password must be at least 6 characters.'); return; }
  clearAuthError(); setLoading(true);
  try {
    await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
    window.location.href = 'index.html';
  } catch (e) {
    setLoading(false);
    showAuthError(friendlyAuthError(e.code));
  }
}

// -- Google sign-in --
async function signInWithGoogle() {
  clearAuthError();
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await window.firebaseAuth.signInWithPopup(provider);
    window.location.href = 'index.html';
  } catch (e) {
    if (e.code !== 'auth/popup-closed-by-user') showAuthError(friendlyAuthError(e.code));
  }
}

// -- Password reset --
async function resetPassword() {
  const email = document.getElementById('signin-email').value.trim();
  if (!email) { showAuthError('Enter your email address first, then click Forgot password.'); return; }
  try {
    await window.firebaseAuth.sendPasswordResetEmail(email);
    showAuthError('Reset email sent. Check your inbox.');
  } catch (e) {
    showAuthError(friendlyAuthError(e.code));
  }
}

// -- Enter key handling --
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    if (authMode === 'signin') signIn();
    else signUp();
  }
});

function friendlyAuthError(code) {
  const map = {
    'auth/user-not-found':       'No account found with this email.',
    'auth/wrong-password':       'Incorrect password.',
    'auth/invalid-email':        'Please enter a valid email address.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password':        'Password must be at least 6 characters.',
    'auth/too-many-requests':    'Too many attempts. Please try again later.',
    'auth/network-request-failed':'Network error. Check your connection.',
    'auth/invalid-credential':   'Incorrect email or password.'
  };
  return map[code] || 'Something went wrong. Please try again.';
}
