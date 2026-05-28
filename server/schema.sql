CREATE TABLE visitors (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  business      VARCHAR(200) NOT NULL,
  phone         VARCHAR(20),
  email         VARCHAR(200) NOT NULL,
  area          VARCHAR(100),
  use_case      VARCHAR(20) CHECK (use_case IN ('home','business')),
  connected_at  TIMESTAMPTZ DEFAULT now(),
  session_id    UUID
);