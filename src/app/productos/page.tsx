import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Productos — FÉNYA" };

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-20 md:px-8">
      <div className="mb-14 max-w-[560px]">
        <p className="mb-2.5 text-sm tracking-wide text-rose">Tienda</p>
        <h1 className="font-serif text-4xl italic">Todos los productos</h1>
        <p className="mt-3.5 text-ink-soft">
          Cada fórmula está pensada para un paso específico de tu rutina.
          Explora y arma tu ritual.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
