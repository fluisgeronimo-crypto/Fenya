import { Product } from "@/types/product";
import { seedProducts } from "./seed-products";
import { supabase, isSupabaseConfigured } from "./supabase";

// -----------------------------------------------------------------------
// Capa de acceso a datos. Si Supabase está configurado (variables de
// entorno presentes), lee de ahí. Si no, usa los datos de ejemplo — así
// el sitio nunca se rompe mientras terminas de configurar la base de
// datos, y no hay que tocar ninguna página cuando la conectes.
// -----------------------------------------------------------------------

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  price: number;
  currency: "MXN";
  presentation: string;
  skin_types: Product["skinTypes"];
  benefits: string[];
  ingredients: string[];
  how_to_use: string[];
  image_url: string | null;
  featured: boolean | null;
}

function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    price: row.price,
    currency: row.currency ?? "MXN",
    presentation: row.presentation,
    skinTypes: row.skin_types,
    benefits: row.benefits,
    ingredients: row.ingredients,
    howToUse: row.how_to_use,
    image: row.image_url
      ? { gradientFrom: "#F3E0DC", gradientTo: "#E7DDD0" } // placeholder si aún no subes fotos reales
      : { gradientFrom: "#F3E0DC", gradientTo: "#E7DDD0" },
    featured: Boolean(row.featured),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error al leer productos de Supabase:", error.message);
      return seedProducts; // fallback seguro en vez de tumbar la página
    }
    return (data as ProductRow[]).map(mapRowToProduct);
  }

  return seedProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return undefined;
    return mapRowToProduct(data as ProductRow);
  }

  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
