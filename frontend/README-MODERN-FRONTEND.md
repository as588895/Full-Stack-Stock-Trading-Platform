# Northstar — Modern Frontend

This is a separate redesign copy of the original `frontend` folder. The original `frontend`, `dashboard`, and `Backend` folders are not overwritten.

## What changed
- Premium dark-green / lime investing brand and responsive layout.
- Redesigned login and signup screens, password visibility toggle, loading states, and form validation.
- Existing API routes and backend URLs are preserved:
  - Login: `POST /api/auth/login`
  - Signup: `POST /api/auth/signup` via the existing `services/authApi.js`
- Login continues to store the returned user/token and redirects to the existing dashboard URL.

## Run
Open a terminal in `frontend-modern` and run:

```bash
npm install
npm start
```

For local login, the existing code expects the backend at `http://localhost:3002` and dashboard at `http://localhost:3001`.

Note: the redesigned auth pages are implemented in this folder; the rest of the original landing-page sections are retained from the source frontend copy. This avoids changing backend or dashboard behavior.
