-- ============================================================================
-- Maestría en Finanzas Corporativas + IA — Cuestionarios y entregas de casos
-- ----------------------------------------------------------------------------
-- quiz_attempts    : cada intento de cuestionario de una asignatura (máx. 3).
-- case_submissions : entrega de la solución del caso (archivos en Storage).
-- Storage bucket 'entregas' con RLS: cada alumno gestiona su carpeta; admin lee todo.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1) quiz_attempts
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  asignatura_cod text not null,          -- '1.1' … '4.4'
  score int not null,                    -- respuestas correctas
  total int not null default 15,
  answers jsonb not null default '[]',   -- índices elegidos por pregunta
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_cod on public.quiz_attempts (user_id, asignatura_cod);

-- ---------------------------------------------------------------------------
-- 2) case_submissions
-- ---------------------------------------------------------------------------
create table if not exists public.case_submissions (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  asignatura_cod text not null,
  files jsonb not null default '[]',     -- [{ name, path, kind }]
  note text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists case_submissions_user_cod on public.case_submissions (user_id, asignatura_cod);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.quiz_attempts    enable row level security;
alter table public.case_submissions enable row level security;

-- quiz_attempts: el alumno ve e inserta lo suyo; el admin lee todo.
drop policy if exists qa_select on public.quiz_attempts;
create policy qa_select on public.quiz_attempts
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists qa_insert on public.quiz_attempts;
create policy qa_insert on public.quiz_attempts
  for insert to authenticated with check (user_id = auth.uid());

-- case_submissions: idem.
drop policy if exists cs_select on public.case_submissions;
create policy cs_select on public.case_submissions
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
drop policy if exists cs_insert on public.case_submissions;
create policy cs_insert on public.case_submissions
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists cs_delete on public.case_submissions;
create policy cs_delete on public.case_submissions
  for delete to authenticated using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- 3) Storage: bucket privado 'entregas'
--    Ruta de cada archivo: {user_id}/{asignatura_cod}/{archivo}
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('entregas', 'entregas', false)
on conflict (id) do nothing;

-- El alumno gestiona su propia carpeta (primer segmento = su uid); el admin lee todo.
drop policy if exists entregas_insert on storage.objects;
create policy entregas_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'entregas' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists entregas_select on storage.objects;
create policy entregas_select on storage.objects
  for select to authenticated
  using (bucket_id = 'entregas' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

drop policy if exists entregas_update on storage.objects;
create policy entregas_update on storage.objects
  for update to authenticated
  using (bucket_id = 'entregas' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists entregas_delete on storage.objects;
create policy entregas_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'entregas' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
