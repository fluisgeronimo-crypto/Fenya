import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

// Configura esta URL como webhook endpoint en tu dashboard de Stripe:
// https://dashboard.stripe.com/webhooks -> Add endpoint
//   URL: https://tu-dominio.vercel.app/api/webhooks/stripe
//   Evento a escuchar: checkout.session.completed
// Copia el "Signing secret" que te da Stripe a STRIPE_WEBHOOK_SECRET en .env.local

export async function POST(req: NextRequest) {
  if (!isStripeConfigured || !stripe) {
    return NextResponse.json({ error: "Stripe no configurado" }, { status: 501 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    if (!webhookSecret || !signature) {
      // Sin secret configurado aún: aceptamos el payload sin verificar firma
      // SOLO para desarrollo local. En producción, configura el secret.
      event = JSON.parse(payload) as Stripe.Event;
    } else {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: `Webhook inválido: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (isSupabaseConfigured && supabase) {
      // El evento del webhook no trae los line_items completos por defecto;
      // se piden aparte, expandidos, para guardar el detalle del pedido.
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      });

      const { error } = await supabase.from("orders").insert({
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email,
        items: fullSession.line_items?.data ?? [],
        total: (session.amount_total ?? 0) / 100,
        status: "paid",
      });
      if (error) {
        console.error("Error al guardar el pedido en Supabase:", error.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
