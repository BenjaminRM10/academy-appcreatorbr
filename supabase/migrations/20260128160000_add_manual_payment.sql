ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'stripe',
ADD COLUMN IF NOT EXISTS payment_proof_status TEXT DEFAULT 'none',
ADD COLUMN IF NOT EXISTS payment_proof_submitted_at TIMESTAMPTZ;
