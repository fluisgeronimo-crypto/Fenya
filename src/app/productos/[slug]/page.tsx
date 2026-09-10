import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getProducts } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

// Genera las rutas estáticas /productos/[slug] a partir de los productos.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:px-8">
      <nav className="mb-10 text-sm text-ink-soft">
        <Link href="/productos" className="hover:text-rose-deep">
          Productos
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-14 md:grid-cols-2">
        <div
          className="flex aspect-[4/5] items-center justify-center rounded-3xl"
          style={{
            background: `linear-gradient(160deg, ${product.image.gradientFrom}, ${product.image.gradientTo})`,
          }}
        >
          <svg viewBox="0 0 140 180" fill="none" className="w-[38%]">
            <rect x="35" y="40" width="70" height="120" rx="14" fill="#FDFAF7" stroke="#B97C78" strokeWidth="1" />
            <rect x="50" y="20" width="40" height="24" rx="6" fill="#B97C78" />
            <text x="70" y="105" fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="12" fill="#A2645F" textAnchor="middle">Fénya</text>
          </svg>
        </div>

        <div>
          <h1 className="font-serif text-4xl italic">{product.name}</h1>
          <p className="mt-3 text-ink-soft">{product.shortDescription}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-2xl font-medium text-rose-deep">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-ink-soft">
              · {product.presentation}
            </span>
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {product.skinTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft"
              >
                {type}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-10 border-t border-line pt-10">
            <div>
              <h2 className="font-serif text-xl italic">Beneficios</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-powder">·</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl italic">Ingredientes</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                {product.ingredients.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-powder">·</span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl italic">Forma de uso</h2>
              <ol className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                {product.howToUse.map((step, i) => (
                  <li key={step} className="flex gap-2">
                    <span className="text-powder">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
