import Link from "next/link";
import { Product } from "@/types/product";

function formatPrice(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  });
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-28px_rgba(62,50,47,0.28)]">
      <Link
        href={`/productos/${product.slug}`}
        className="relative flex aspect-[4/5] items-center justify-center"
        style={{
          background: `linear-gradient(160deg, ${product.image.gradientFrom}, ${product.image.gradientTo})`,
        }}
      >
        <svg viewBox="0 0 140 180" fill="none" className="w-[46%]">
          <rect
            x="35"
            y="40"
            width="70"
            height="120"
            rx="14"
            fill="#FDFAF7"
            stroke="#B97C78"
            strokeWidth="1"
          />
          <rect x="50" y="20" width="40" height="24" rx="6" fill="#B97C78" />
          <text
            x="70"
            y="105"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fontSize="12"
            fill="#A2645F"
            textAnchor="middle"
          >
            Fénya
          </text>
        </svg>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-6">
        <h3 className="font-serif text-xl font-semibold">{product.name}</h3>
        <p className="flex-1 text-sm text-ink-soft">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-medium text-rose-deep">
            {formatPrice(product.price)}
          </span>
          <Link
            href={`/productos/${product.slug}`}
            className="border-b border-powder pb-0.5 text-sm tracking-wide text-ink transition-colors hover:border-rose-deep hover:text-rose-deep"
          >
            Ver producto
          </Link>
        </div>
      </div>
    </article>
  );
}
