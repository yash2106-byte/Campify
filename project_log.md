# Project Log

This file documents the steps taken to connect the static Campify frontend to the Node.js backend.

## 2026-04-21

- **Initialization:** Started connecting the frontend and backend.
- **Plan created:** Defined backend CORS integration and frontend fetch calls.
- **Task List Initialized:** Tracked the tasks for implementation.
- **Backend Updated:**
  - Ran `npm install cors` in `Backend/`.
  - Added `cors` middleware to `Backend/index.js` to accept cross-origin requests.
- **Frontend Updated:**
  - Updated `Campify/frontend/SignUp/SignUp.js` to send a POST fetch request to `/signup` with `{formdata: {Username, Gmail, Password}}`.
  - Updated `Campify/frontend/Signin/Signin.js` to send a POST fetch request to `/login` with `{formdata: {Gmail, Password}}` and save the resulting JWT token in `localStorage`.
- **Task Completion:** Successfully connected the frontend logic to the backend JSON API.
- **Unified Command Added:**
  - Created root `package.json` with `concurrently`.
  - Configured `npm start` to run `docker-compose up`, backend dev script, and `http-server` together.
- **Auth Page Navigation Added:**
  - Created root file `Campify/frontend/index.html` strictly forwarding root URL searches to `SignUp.html`.
  - Appended `localStorage.getItem("token")` checks at the head of `SignUp.js`, `Signin.js`, and `index.js` causing smart redirections so users cannot visit invalid pages randomly.
