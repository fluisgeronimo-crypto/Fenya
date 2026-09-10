import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { getProductBySlug } from "@/lib/products";
import { CartItem } from "@/types/product";

interface CheckoutBody {
  items: { slug: string; quantity: number }[];
}

export async function POST(req: NextRequest) {
  if (!isStripeConfigured || !stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe todavía no está configurado. Agrega STRIPE_SECRET_KEY en tu .env.local.",
      },
      { status: 501 }
    );
  }

  const body = (await req.json()) as CheckoutBody;

  if (!body.items?.length) {
    return NextResponse.json(
      { error: "El carrito está vacío." },
      { status: 400 }
    );
  }

  // Volvemos a resolver cada producto en el servidor (nunca confiamos en el
  // precio que venga del cliente) para evitar que alguien manipule el total.
  const resolved: { item: CartItem; quantity: number }[] = [];
  for (const line of body.items) {
    const product = await getProductBySlug(line.slug);
    if (!product) continue;
    resolved.push({ item: { product, quantity: line.quantity }, quantity: line.quantity });
  }

  if (!resolved.length) {
    return NextResponse.json(
      { error: "No se pudo resolver ningún producto del carrito." },
      { status: 400 }
    );
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: resolved.map(({ item, quantity }) => ({
      quantity,
      price_data: {
        currency: "mxn",
        unit_amount: Math.round(item.product.price * 100),
        product_data: {
          name: item.product.name,
          description: item.product.shortDescription,
        },
      },
    })),
    success_url: `${origin}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/productos`,
  });

  return NextResponse.json({ url: session.url });
}
