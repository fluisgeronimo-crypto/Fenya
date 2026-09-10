import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Si aún no configuraste las variables de entorno, `supabase` queda en null
// y lib/products.ts usa los datos de ejemplo automáticamente. En cuanto
// agregues las variables en .env.local (ver .env.local.example), esto se
// activa solo — no hay que tocar código.
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isSupabaseConfigured = Boolean(supabase);

/*
Esquema SQL para crear la tabla en Supabase (SQL editor -> New query):

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text not null,
  price numeric not null,
  currency text default 'MXN',
  presentation text not null,
  skin_types text[] not null,
  benefits text[] not null,
  ingredients text[] not null,
  how_to_use text[] not null,
  image_url text,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  customer_email text,
  items jsonb not null,
  total numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Política mínima de lectura pública para products (ajústala a tu caso):
alter table products enable row level security;
create policy "Los productos son públicos para lectura"
  on products for select
  using (true);
*/
