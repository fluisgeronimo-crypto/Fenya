"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, removeItem, totalPrice } =
    useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.product.slug,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el pago.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error.");
      setLoading(false);
    }
  }

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-ink/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-ivory shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-xl italic">Tu carrito</h2>
          <button onClick={closeCart} aria-label="Cerrar carrito">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={1.4}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="mt-10 text-center text-sm text-ink-soft">
              Aún no has agregado productos.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4">
                  <div
                    className="h-20 w-16 shrink-0 rounded-md"
                    style={{
                      background: `linear-gradient(160deg, ${item.product.image.gradientFrom}, ${item.product.image.gradientTo})`,
                    }}
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="font-serif text-lg">
                      {item.product.name}
                    </span>
                    <span className="text-sm text-ink-soft">
                      {formatPrice(item.product.price)}
                    </span>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() =>
                          setQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-6 w-6 rounded-full border border-line text-sm text-ink-soft"
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          setQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-6 w-6 rounded-full border border-line text-sm text-ink-soft"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-sm text-ink-soft underline decoration-powder underline-offset-2 hover:text-rose-deep"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-6 py-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-ink-soft">Subtotal</span>
            <span className="font-medium">{formatPrice(totalPrice)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={items.length === 0 || loading}
            className="w-full rounded-full bg-rose py-3.5 text-center text-sm tracking-wide text-ivory transition-colors hover:bg-rose-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "REDIRIGIENDO A PAGO…" : "IR A PAGAR"}
          </button>
          {error && (
            <p className="mt-3 text-center text-sm font-medium text-rose-deep">
              {error}
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
