-- ============================================================================
-- Academia de Finanzas Corporativas + IA — Esquema inicial (Supabase / Postgres)
-- ----------------------------------------------------------------------------
-- Tablas de datos de usuario (el contenido del curso vive en el código).
-- Seguridad: Row-Level Security en todas las tablas.
-- Bootstrap: el PRIMER usuario que se registra queda como admin; el resto, alumno.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) profiles  (1 a 1 con auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null default '',
  role text not null default 'student' check (role in ('admin', 'student')),
  company text,
  position text,
  avatar_color text not null default '#34d399',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2) lesson_progress
-- ---------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  quiz_score int,
  minutes_spent int not null default 0,
  last_visited timestamptz default now(),
  unique (user_id, lesson_id)
);

-- ---------------------------------------------------------------------------
-- 3) simulator_runs
-- ---------------------------------------------------------------------------
create table if not exists public.simulator_runs (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  simulator_id text not null,
  summary text not null default '',
  at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 4) messages
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  from_id uuid not null references public.profiles (id) on delete cascade,
  to_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  context text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5) materials  (subidos por el admin)
-- ---------------------------------------------------------------------------
create table if not exists public.materials (
  id bigint generated always as identity primary key,
  lesson_id text,
  title text not null,
  kind text not null default 'articulo',
  description text not null default '',
  url text,
  body text,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 6) custom_lessons  (clases agregadas por el admin; payload = Lesson en JSON)
-- ---------------------------------------------------------------------------
create table if not exists public.custom_lessons (
  id text primary key,
  week int not null,
  title text not null,
  subtitle text not null default '',
  pillar text not null default 'Estrategia Financiera',
  duration_min int not null default 60,
  payload jsonb not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ===========================================================================
-- Helper: ¿el usuario actual es admin?  (SECURITY DEFINER evita recursión RLS)
-- ===========================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ===========================================================================
-- Trigger: crear profile al registrarse. El primer usuario es admin.
-- ===========================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  is_first boolean;
  palette text[] := array['#34d399','#60a5fa','#f472b6','#fbbf24','#a78bfa','#f87171'];
  color text;
begin
  select count(*) = 0 into is_first from public.profiles;
  color := palette[(floor(random() * array_length(palette, 1)) + 1)::int];

  insert into public.profiles (id, name, email, role, company, position, avatar_color)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    case when is_first then 'admin' else 'student' end,
    new.raw_user_meta_data ->> 'company',
    new.raw_user_meta_data ->> 'position',
    case when is_first then '#d4af37' else color end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ===========================================================================
-- Row-Level Security
-- ===========================================================================
alter table public.profiles        enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.simulator_runs  enable row level security;
alter table public.messages        enable row level security;
alter table public.materials       enable row level security;
alter table public.custom_lessons  enable row level security;

-- profiles: cualquier autenticado puede leer (necesario para mensajería y panel
-- de alumnos); cada uno actualiza lo suyo; el admin puede actualizar a todos.
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select to authenticated using (true);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update to authenticated using (id = auth.uid() or public.is_admin());

-- lesson_progress: el alumno gestiona lo suyo; el admin lee todo.
drop policy if exists lp_select on public.lesson_progress;
create policy lp_select on public.lesson_progress
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists lp_modify on public.lesson_progress;
create policy lp_modify on public.lesson_progress
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- simulator_runs: idem.
drop policy if exists sr_select on public.simulator_runs;
create policy sr_select on public.simulator_runs
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists sr_insert on public.simulator_runs;
create policy sr_insert on public.simulator_runs
  for insert to authenticated with check (user_id = auth.uid());

-- messages: ves los tuyos (enviados o recibidos); enviás como vos mismo;
-- marcás como leído los que recibiste.
drop policy if exists msg_select on public.messages;
create policy msg_select on public.messages
  for select to authenticated using (from_id = auth.uid() or to_id = auth.uid());
drop policy if exists msg_insert on public.messages;
create policy msg_insert on public.messages
  for insert to authenticated with check (from_id = auth.uid());
drop policy if exists msg_update on public.messages;
create policy msg_update on public.messages
  for update to authenticated using (to_id = auth.uid());

-- materials: lectura para todos los autenticados; alta/baja sólo admin.
drop policy if exists mat_select on public.materials;
create policy mat_select on public.materials
  for select to authenticated using (true);
drop policy if exists mat_modify on public.materials;
create policy mat_modify on public.materials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- custom_lessons: lectura para todos; alta/baja sólo admin.
drop policy if exists cl_select on public.custom_lessons;
create policy cl_select on public.custom_lessons
  for select to authenticated using (true);
drop policy if exists cl_modify on public.custom_lessons;
create policy cl_modify on public.custom_lessons
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ===========================================================================
-- Realtime (opcional): mensajería en vivo
-- ===========================================================================
alter publication supabase_realtime add table public.messages;
