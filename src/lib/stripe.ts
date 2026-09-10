import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

export const isStripeConfigured = Boolean(secretKey);

// Se instancia solo si hay clave — evita que el build truene sin ella.
export const stripe = secretKey
  ? new Stripe(secretKey, { apiVersion: "2026-08-26.dahlia" })
  : null;
