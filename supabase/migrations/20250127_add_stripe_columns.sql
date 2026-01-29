-- Add Stripe payment tracking columns to enrollments table
-- Run this migration in Supabase SQL editor

-- Add columns for Stripe payment tracking
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_enrollments_stripe_session ON enrollments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON enrollments(payment_status);

-- Add comment for documentation
COMMENT ON COLUMN enrollments.stripe_session_id IS 'Stripe Checkout Session ID';
COMMENT ON COLUMN enrollments.stripe_payment_intent IS 'Stripe Payment Intent ID';
COMMENT ON COLUMN enrollments.paid_at IS 'Timestamp when payment was confirmed';
