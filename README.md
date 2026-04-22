# revision-timer

A personal revision timer for GCSE study — method selection, spaced repetition, spec tracker, stats, and Notion integration.

## File structure

```
index.html              Main app
auth.html               Sign-in / sign-up page
css/
  style.css             Core styles
  style2.css            Toast, SR overlay, auth, animations
js/
  data.js               All static data (timetable, subjects, spec, etc.)
  firebase-config.js    Firebase project config (edit this)
  storage.js            localStorage + Firestore sync
  auth.js               Auth page logic
  app.js                Main app logic
```

## Deploy to GitHub Pages

1. Push all files to a GitHub repo (keep the folder structure intact).
2. In the repo: **Settings → Pages → Branch: main / root → Save**.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.

## Firebase setup (optional — for cross-device sync and sign-in)

Without Firebase the app works perfectly using `localStorage`. Data stays in the browser on that device only.

To enable sign-in and cloud sync:

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create a project.
2. Add a **Web app** and copy the config object.
3. Open `js/firebase-config.js` and paste in your values.
4. In Firebase console:
   - **Authentication → Sign-in method** → enable **Email/Password** and **Google**.
   - **Firestore Database → Create database** (start in production mode).
5. **Authentication → Settings → Authorised domains** → add your GitHub Pages domain:  
   `yourusername.github.io`
6. In **Firestore → Rules**, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Personal mode password

The personal mode PIN is set in `js/app.js` in the `tryUnlock()` function.  
Change `const PASSWORD = 'Xaniel32!';` to whatever you like.

## Customising your data

All personal data lives in `js/data.js`:

- `TIMETABLE` — your daily session schedule
- `SUBJECTS` — subjects, target grades, exam dates, weekly minute targets
- `EXAMS` — individual exam dates and papers
- `NOTION_PAGES` — your Notion workspace links
- `SPEC` — spec points per subject
- `HOW_TO` — revision tips per subject
