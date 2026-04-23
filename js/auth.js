// js/auth.js -- Solus authentication

function applyAuthTheme() {
  let t = 'dark';
  try { t = localStorage.getItem('rv_theme') || 'dark'; } catch(e) {}
  document.documentElement.setAttribute('data-theme', t);
  const tcm = document.getElementById('tcm');
  if (tcm) tcm.content = t === 'dark' ? '#0e1010' : '#f2f2ed';
}

function switchMode(mode) {
  const signinPanel = document.getElementById('signin-panel');
  const signupPanel = document.getElementById('signup-panel');
  const tabSignin   = document.getElementById('tab-signin');
  const tabSignup   = document.getElementById('tab-signup');
  if (mode === 'signin') {
    if (signinPanel) signinPanel.style.display = 'block';
    if (signupPanel) signupPanel.style.display = 'none';
    if (tabSignin)   tabSignin.classList.add('active');
    if (tabSignup)   tabSignup.classList.remove('active');
  } else {
    if (signinPanel) signinPanel.style.display = 'none';
    if (signupPanel) signupPanel.style.display = 'block';
    if (tabSignin)   tabSignin.classList.remove('active');
    if (tabSignup)   tabSignup.classList.add('active');
  }
  clearAuthError();
}

function showAuthError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

function clearAuthError() {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = ''; el.classList.remove('show'); }
}

function setLoading(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn._label = btn.textContent;
    btn.textContent = 'Please wait...';
    btn.disabled = true;
  } else {
    btn.textContent = btn._label || btn.dataset.label || 'Submit';
    btn.disabled = false;
  }
}

async function signIn() {
  clearAuthError();
  if (!window.FIREBASE_ENABLED || !window.firebaseAuth) {
    window.location.href = 'index.html';
    return;
  }
  const emailEl = document.getElementById('signin-email');
  const passEl  = document.getElementById('signin-password');
  const btn     = document.querySelector('#signin-panel .auth-submit-btn');
  const email   = emailEl ? emailEl.value.trim() : '';
  const pass    = passEl  ? passEl.value : '';
  if (!email || !pass) { showAuthError('Please enter your email and password.'); return; }
  setLoading(btn, true);
  try {
    await window.firebaseAuth.signInWithEmailAndPassword(email, pass);
    window.location.href = 'index.html';
  } catch(e) {
    setLoading(btn, false);
    const msgs = {
      'auth/user-not-found':      'No account with that email.',
      'auth/wrong-password':      'Incorrect password.',
      'auth/invalid-email':       'Invalid email address.',
      'auth/too-many-requests':   'Too many attempts. Try again later.',
      'auth/user-disabled':       'This account has been disabled.',
      'auth/invalid-credential':  'Email or password is incorrect.'
    };
    showAuthError(msgs[e.code] || 'Sign in failed. Please try again.');
  }
}

async function signUp() {
  clearAuthError();
  if (!window.FIREBASE_ENABLED || !window.firebaseAuth) {
    window.location.href = 'index.html';
    return;
  }
  const emailEl   = document.getElementById('signup-email');
  const passEl    = document.getElementById('signup-password');
  const confirmEl = document.getElementById('signup-confirm');
  const btn       = document.querySelector('#signup-panel .auth-submit-btn');
  const email   = emailEl   ? emailEl.value.trim() : '';
  const pass    = passEl    ? passEl.value : '';
  const confirm = confirmEl ? confirmEl.value : '';
  if (!email || !pass) { showAuthError('Please enter your email and password.'); return; }
  if (pass.length < 6) { showAuthError('Password must be at least 6 characters.'); return; }
  if (pass !== confirm) { showAuthError('Passwords do not match.'); return; }
  setLoading(btn, true);
  try {
    await window.firebaseAuth.createUserWithEmailAndPassword(email, pass);
    window.location.href = 'index.html';
  } catch(e) {
    setLoading(btn, false);
    const msgs = {
      'auth/email-already-in-use': 'An account already exists with this email.',
      'auth/invalid-email':        'Invalid email address.',
      'auth/weak-password':        'Password is too weak.'
    };
    showAuthError(msgs[e.code] || 'Sign up failed. Please try again.');
  }
}

async function signInWithGoogle() {
  clearAuthError();
  if (!window.FIREBASE_ENABLED || !window.firebaseAuth) {
    window.location.href = 'index.html';
    return;
  }
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await window.firebaseAuth.signInWithPopup(provider);
    window.location.href = 'index.html';
  } catch(e) {
    if (e.code === 'auth/popup-closed-by-user') return;
    showAuthError('Google sign-in failed. Please try again.');
  }
}

async function resetPassword() {
  clearAuthError();
  if (!window.FIREBASE_ENABLED || !window.firebaseAuth) {
    showAuthError('Password reset is not available in local mode.');
    return;
  }
  const emailEl = document.getElementById('signin-email');
  const email   = emailEl ? emailEl.value.trim() : '';
  if (!email) { showAuthError('Enter your email above, then tap Forgot password.'); return; }
  try {
    await window.firebaseAuth.sendPasswordResetEmail(email);
    const el = document.getElementById('auth-error');
    if (el) {
      el.style.background  = 'var(--brk-l)';
      el.style.borderColor = 'rgba(60,114,80,.2)';
      el.style.color       = 'var(--brk)';
      el.textContent = 'Reset email sent. Check your inbox.';
      el.classList.add('show');
    }
  } catch(e) {
    showAuthError('Could not send reset email. Check the address and try again.');
  }
}

// Add enter-key support to all inputs
document.addEventListener('DOMContentLoaded', () => {
  const signinInputs = document.querySelectorAll('#signin-panel input');
  signinInputs.forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') signIn(); });
  });
  const signupInputs = document.querySelectorAll('#signup-panel input');
  signupInputs.forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') signUp(); });
  });
});
