# Frontend — GitOps Employee Management Platform

React (Vite) + Tailwind CSS v4 + React Router + Axios + Context API.
Talks only to the Express REST API — no direct database access, per the platform's architecture.

## 1. Run locally (against your existing backend)

```bash
cd frontend
npm install
cp .env.example .env      # adjust VITE_API_URL if your backend isn't on :5000
npm run dev                # http://localhost:5173
```

Make sure the Express backend (and PostgreSQL) is already running — either via
`docker-compose up` from the project root, or `npm run dev` inside `backend/`.

If your backend enables CORS, allow `http://localhost:5173` as an origin during local dev.

## 2. Build & run with Docker (still local)

```bash
cd frontend
docker build -t employee-frontend:local --build-arg VITE_API_URL=http://localhost:5000/api .
docker run -p 8080:80 employee-frontend:local
```

Open http://localhost:8080. This is the same image that will run in Kubernetes.

### Optional: add to your root docker-compose.yml

```yaml
  frontend:
    build:
      context: ./frontend
      args:
        VITE_API_URL: http://localhost:5000/api
    ports:
      - "8080:80"
    depends_on:
      - backend
```

## 3. Push the image

```bash
docker tag employee-frontend:local <your-dockerhub-username>/employee-frontend:latest
docker push <your-dockerhub-username>/employee-frontend:latest
```

Then update the `image:` field in `k8s/frontend-deployment.yaml`.

> Note: `VITE_API_URL` is baked into the JS bundle at **build time** (Vite env vars are
> static). If the backend's in-cluster URL differs from your local one, rebuild the image
> with the correct `--build-arg VITE_API_URL=...` before pushing — you can't change it at
> container runtime like a normal env var.

## 4. Deploy to Kubernetes

```bash
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

This mirrors the existing backend pattern: a `Deployment` for the stateless frontend and
a `NodePort` `Service` (swap for an `Ingress` once you add one — it's listed under Future
Improvements in the project docs).

Check it:

```bash
kubectl get pods -l app=frontend
kubectl get svc frontend-service
```

With `minikube`: `minikube service frontend-service` opens it in your browser directly.

## 5. GitOps

Once this is committed and pushed to the repo, point ArgoCD/FluxCD at the `k8s/` folder
(or merge these two manifests into the project's existing `k8s/` directory) so the
frontend deploys automatically alongside the backend, per the existing sync workflow.

## Project structure

```
src/
├── api/axios.js          # axios instance + JWT interceptor
├── context/AuthContext.jsx
├── components/           # Sidebar, Topbar, Layout, Modal, Card, Badge, ProtectedRoute
└── pages/
    ├── Login.jsx / Register.jsx
    ├── Dashboard.jsx
    ├── Employees.jsx     # full CRUD
    ├── Departments.jsx   # full CRUD
    └── Users.jsx         # read-only, admin only
```

## Assumptions to double-check against your backend

- `POST /api/auth/login` returns `{ token, user: { name, email, role } }` (or similar —
  the code also falls back to `accessToken` / `employee`).
- `role === 'admin'` gates the Users page and nav item.
- `GET /api/dashboard` returns something like `{ totalEmployees, totalDepartments, totalUsers }`.

If your backend's field names differ, adjust the small number of places in
`AuthContext.jsx` and `Dashboard.jsx` that read them — everything else is generic.
