/*
# Create contact_messages table (single-tenant, no auth)

1. Purpose
- Stores messages submitted through the portfolio contact form.
- Kareem Ahmed (site owner) reads submitted messages via the Supabase dashboard.
- No sign-in screen on the site, so writes come from the anon-key client.

2. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's name
  - `email` (text, not null) — sender's email
  - `subject` (text, not null) — message subject
  - `message` (text, not null) — message body
  - `read` (boolean, default false) — flag for Kareem to track read messages
  - `created_at` (timestamptz, default now())

3. Security
- Enable RLS on `contact_messages`.
- Grant INSERT to `anon, authenticated` (visitors submit messages; nobody reads via the Data API from the site).
- No SELECT/UPDATE/DELETE grants to anon/authenticated — only the service_role (dashboard) reads messages.
- INSERT policy allows anyone (anon, authenticated) to insert a new message.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_contact_message" ON contact_messages;
CREATE POLICY "anon_insert_contact_message"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);
