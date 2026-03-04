/**
 * Stripe Configuration
 * 
 * The publishable key is set here. Replace with your real key when ready.
 * The secret key is stored as a Supabase/Cloud secret (STRIPE_SECRET_KEY).
 * 
 * To complete setup:
 * 1. Add STRIPE_SECRET_KEY to Cloud secrets
 * 2. Add STRIPE_WEBHOOK_SECRET to Cloud secrets  
 * 3. Replace the publishable key below with your real one
 * 4. Deploy the edge functions (create-payment-intent, stripe-webhook)
 * 5. Set up webhook endpoint in Stripe dashboard pointing to stripe-webhook function
 */

// Replace with your real Stripe publishable key
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";

export const isStripeConfigured = (): boolean => {
  return STRIPE_PUBLISHABLE_KEY.length > 0 && STRIPE_PUBLISHABLE_KEY.startsWith("pk_");
};
