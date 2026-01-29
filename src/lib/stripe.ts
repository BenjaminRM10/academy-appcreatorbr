import Stripe from 'stripe'

// Lazy initialization to avoid issues during build
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
    }
    stripeInstance = new Stripe(key)
  }
  return stripeInstance
}

// Export for backward compatibility
export const stripe = {
  get checkout() {
    return getStripe().checkout
  },
  get webhooks() {
    return getStripe().webhooks
  },
}

// Course price in MXN centavos ($800 MXN = 80000 centavos)
export const COURSE_PRICE_CENTAVOS = 80000
export const COURSE_PRICE_DISPLAY = '$800 MXN'
