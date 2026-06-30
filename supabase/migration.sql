-- Emma Math Learning Portal — Database Schema

create extension if not exists "pgcrypto";

-- topics
create table if not exists topics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  grade_level text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- lessons
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text,
  content text,
  examples jsonb default '[]',
  common_mistakes jsonb default '[]',
  topic_id uuid references topics(id),
  week_number integer,
  sort_order integer default 0,
  status text default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- questions
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid references topics(id),
  lesson_id uuid references lessons(id),
  week_number integer,
  question_text text not null,
  question_type text not null check (question_type in ('multiple_choice','numeric','text')),
  difficulty text not null check (difficulty in ('easy','standard','word_problem','challenge')),
  choices jsonb default '[]',
  correct_answer text not null,
  explanation text,
  is_challenge boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- quizzes
create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  week_number integer,
  topic_id uuid references topics(id),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- quiz_questions
create table if not exists quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- attempts
create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id),
  quiz_id uuid references quizzes(id),
  user_answer text,
  is_correct boolean,
  attempt_type text not null check (attempt_type in ('practice','quiz','review')),
  time_spent_seconds integer,
  created_at timestamptz default now()
);

-- weekly_progress
create table if not exists weekly_progress (
  id uuid primary key default gen_random_uuid(),
  week_number integer not null unique,
  status text default 'not_started' check (status in ('not_started','in_progress','completed','needs_review')),
  completion_percentage integer default 0,
  lesson_completed boolean default false,
  practice_completed boolean default false,
  quiz_completed boolean default false,
  quiz_score integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS but allow all access for MVP (no auth)
alter table topics enable row level security;
alter table lessons enable row level security;
alter table questions enable row level security;
alter table quizzes enable row level security;
alter table quiz_questions enable row level security;
alter table attempts enable row level security;
alter table weekly_progress enable row level security;

create policy "public read topics" on topics for select using (true);
create policy "public write topics" on topics for all using (true);
create policy "public read lessons" on lessons for select using (true);
create policy "public write lessons" on lessons for all using (true);
create policy "public read questions" on questions for select using (true);
create policy "public write questions" on questions for all using (true);
create policy "public read quizzes" on quizzes for select using (true);
create policy "public write quizzes" on quizzes for all using (true);
create policy "public read quiz_questions" on quiz_questions for select using (true);
create policy "public write quiz_questions" on quiz_questions for all using (true);
create policy "public read attempts" on attempts for select using (true);
create policy "public write attempts" on attempts for all using (true);
create policy "public read weekly_progress" on weekly_progress for select using (true);
create policy "public write weekly_progress" on weekly_progress for all using (true);
