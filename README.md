# FiveUBuild

FiveUBuild is a production-ready full-stack AI web app builder. Users describe an app in plain English, generate complete HTML/CSS/JS with Gemini, preview instantly, edit with Monaco, and download or save projects.

## Features

- Supabase Auth authentication (register/login/me/logout)
- AI app generation and iterative refinement via chat
- Project CRUD with search, rename, delete confirmation
- Builder workspace with:
  - Left sidebar (project actions + prompt suggestions)
  - Center chat panel
  - Right panel tabs (Preview, HTML, CSS, JS, Full Code)
- Live iframe preview
- Monaco code editor for manual edits
- Download full HTML output
- Responsive premium SaaS UI with motion and glass styling
- Footer branding: Built by FiveU Technologies

## Tech Stack

- Frontend: React + Vite, Tailwind CSS, React Router, Lucide React, Framer Motion, Monaco Editor
- Backend: Node.js, Express, Supabase, Gemini API
- Database: Supabase PostgreSQL

## Folder Structure

```txt
fiveubuild/
  frontend/
    src/
      components/
      context/
      hooks/
      pages/
      services/
      utils/
      App.jsx
      main.jsx
      index.css
  backend/
    src/
      config/
      controllers/
      middleware/
      routes/
      services/
      utils/
      server.js
  README.md
```

## Environment Variables

Frontend (`frontend/.env`):

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Backend (`backend/.env`):

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

## Supabase Schema SQL

```sql
create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key,
  name text not null,
  email text unique not null,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text,
  prompt text,
  html_code text,
  css_code text,
  js_code text,
  full_code text,
  preview_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz default now()
);
```

## Setup

1. Clone and enter repo.
2. Create `frontend/.env` from `frontend/.env.example`.
3. Create `backend/.env` from `backend/.env.example`.
4. Install dependencies:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

Default URLs:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## API Documentation

### Auth
- Frontend uses Supabase Auth directly for register/login/logout.
- `GET /api/auth/me` protected (Bearer Supabase access token) -> `{user}`

### Projects
- `GET /api/projects` protected -> `{projects}`
- `POST /api/projects` protected body: `{title,prompt}` -> `{project}`
- `GET /api/projects/:id` protected -> `{project,messages}`
- `PUT /api/projects/:id` protected body: partial project fields -> `{project}`
- `DELETE /api/projects/:id` protected -> `{success:true}`
- `GET /api/projects/:id/download` protected -> HTML file download

### AI
- `POST /api/ai/generate` protected body: `{prompt,projectId?}` -> `{code}`
- `POST /api/ai/refine` protected body: `{projectId,message}` -> `{code}`

`code` format:

```json
{
  "html_code": "...",
  "css_code": "...",
  "js_code": "...",
  "full_code": "..."
}
```

## Future Improvements

- Team workspaces and sharing permissions
- Version history and rollback
- GitHub export/import
- Real-time collaboration cursors
- Usage analytics and billing integration
