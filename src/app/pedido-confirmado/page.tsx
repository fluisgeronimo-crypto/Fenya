import Link from "next/link";
import { stripe, isStripeConfigured } from "@/lib/stripe";

export const metadata = { title: "Pedido confirmado — FÉNYA" };

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let email: string | null = null;
  let total: number | null = null;

  if (session_id && isStripeConfigured && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      email = session.customer_details?.email ?? null;
      total = session.amount_total ? session.amount_total / 100 : null;
    } catch {
      // Sesión inválida o expirada: mostramos la confirmación genérica.
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-28 text-center md:px-8">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-blush">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="#A2645F" className="h-6 w-6">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="font-serif text-3xl italic">Gracias por tu pedido</h1>
      <p className="mt-3 text-ink-soft">
        {email
          ? `Te enviamos la confirmación a ${email}.`
          : "En cuanto confirmemos tu pago, recibirás un correo con los detalles."}
      </p>
      {total !== null && (
        <p className="mt-4 text-lg text-rose-deep">{formatPrice(total)}</p>
      )}
      <Link
        href="/productos"
        className="mt-9 inline-block rounded-full bg-rose px-8 py-3.5 text-sm tracking-wide text-ivory hover:bg-rose-deep"
      >
        SEGUIR EXPLORANDO
      </Link>
    </main>
  );
}
