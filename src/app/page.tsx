import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <main>
      {/* HERO */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pb-10 pt-16 md:grid-cols-[1fr_0.95fr] md:px-8 md:pt-20">
        <div>
          <p className="mb-4 text-sm tracking-wide text-rose">
            Cuidado de la piel · Ritual diario
          </p>
          <h1 className="max-w-[9.5ch] font-serif text-5xl italic leading-[1.05] md:text-6xl">
            Tu piel, tu ritual.
          </h1>
          <p className="mt-6 max-w-[38ch] text-ink-soft">
            Fórmulas suaves, texturas ligeras y un ritual sencillo para que
            cuidar tu piel se sienta como un momento propio, cada día.
          </p>
          <div className="mt-9 flex items-center gap-6">
            <Link
              href="/productos"
              className="rounded-full bg-rose px-8 py-3.5 text-xs tracking-wide text-ivory transition-colors hover:bg-rose-deep"
            >
              DESCUBRIR FÉNYA
            </Link>
            <Link
              href="/conoce-fenya"
              className="border-b border-powder pb-0.5 text-sm text-ink-soft"
            >
              Conoce la marca
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute aspect-square w-[88%] rounded-[50%_45%_55%_50%/55%_50%_50%_45%] bg-gradient-to-br from-blush to-sand" />
          <svg viewBox="0 0 220 300" fill="none" className="relative z-10 w-[64%]">
            <rect x="70" y="60" width="80" height="200" rx="18" fill="#FDFAF7" stroke="#DCAFAA" strokeWidth="1.2" />
            <rect x="88" y="30" width="44" height="36" rx="8" fill="#DCAFAA" />
            <rect x="94" y="10" width="32" height="26" rx="6" fill="#B97C78" />
            <line x1="86" y1="120" x2="134" y2="120" stroke="#E4D5CD" strokeWidth="1" />
            <text x="110" y="180" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="17" fill="#A2645F" textAnchor="middle">Fénya</text>
            <text x="110" y="198" fontFamily="Jost, sans-serif" fontSize="7" letterSpacing="1.5" fill="#8A7B76" textAnchor="middle">ACEITE FACIAL</text>
          </svg>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-8">
        <div className="mb-14 max-w-[520px]">
          <p className="mb-2.5 text-sm tracking-wide text-rose">
            Nuestra línea
          </p>
          <h2 className="font-serif text-3xl italic md:text-4xl">
            Rituales para cada piel
          </h2>
          <p className="mt-3.5 text-ink-soft">
            Esenciales pensados para integrarse a tu rutina sin complicarla.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* FILOSOFÍA (resumen) */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 py-24 md:grid-cols-[0.85fr_1fr] md:px-8">
        <div className="relative mx-auto aspect-square w-full max-w-[340px] overflow-hidden rounded-[28px] bg-gradient-to-br from-sand to-blush md:max-w-none">
          <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 m-auto w-[56%]">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#B97C78" strokeWidth="1" />
            <circle cx="100" cy="100" r="46" fill="none" stroke="#B97C78" strokeWidth="0.6" />
            <path d="M100 30v20M100 150v20M30 100h20M150 100h20" stroke="#B97C78" strokeWidth="1" />
          </svg>
        </div>
        <div>
          <p className="mb-3 text-sm tracking-wide text-rose">
            Filosofía FÉNYA
          </p>
          <h2 className="max-w-[11ch] font-serif text-4xl italic leading-tight">
            Menos complicaciones. Más cuidado.
          </h2>
          <p className="mt-5 max-w-[46ch] text-ink-soft">
            Creemos que cuidar tu piel no debería sentirse como una tarea
            más. FÉNYA nace para simplificar tu rutina: pocos pasos,
            fórmulas honestas y un ritual que puedas sostener todos los
            días.
          </p>
          <Link
            href="/conoce-fenya"
            className="mt-6 inline-block border-b border-powder pb-0.5 text-sm text-ink-soft hover:border-rose-deep hover:text-rose-deep"
          >
            Conoce más sobre FÉNYA
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-8">
        <div className="rounded-[28px] bg-gradient-to-br from-rose to-rose-deep px-8 py-16 text-center text-ivory md:px-16">
          <h2 className="font-serif text-3xl italic md:text-4xl">
            Empieza tu ritual hoy
          </h2>
          <p className="mx-auto mt-3.5 max-w-[40ch] text-ivory/85">
            Envío gratis en pedidos mayores a $800 MXN. Prueba FÉNYA con
            nuestro set de iniciación.
          </p>
          <Link
            href="/productos"
            className="mt-7 inline-block rounded-full bg-ivory px-8 py-3.5 text-xs tracking-wide text-rose-deep transition-colors hover:bg-white"
          >
            VER PRODUCTOS
          </Link>
        </div>
      </section>
    </main>
  );
}
