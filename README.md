# AI Face Lock — Web Version

This is a web adaptation of the uploaded desktop Face Authentication project. The browser owns webcam access; FastAPI runs YuNet + SFace on the server.

## Local test
1. `cd backend`
2. `python -m venv venv`
3. Windows: `venv\\Scripts\\activate`
4. `pip install -r requirements.txt`
5. `uvicorn app:app --reload`
6. Open `frontend/index.html` with a local web server (for example VS Code Live Server) and set `API` in `frontend/app.js` to `http://localhost:8000`.

## Deployment
- Backend: deploy `backend/` as a Python Web Service on Render. Build: `pip install -r requirements.txt`; Start: `uvicorn app:app --host 0.0.0.0 --port $PORT`.
- Frontend: deploy `frontend/` as a static site on Vercel.
- Before frontend deployment, change `API` in `frontend/app.js` to your Render backend URL.

## Important
This is an educational biometric demo, not production security. The example uses SQLite; on hosts with ephemeral storage, registrations can be lost after service replacement/redeploy. For a real multi-user deployment, use managed PostgreSQL/object storage and authentication.
