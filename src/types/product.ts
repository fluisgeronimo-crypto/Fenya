// Tipos de dominio para FÉNYA.
// Este shape está pensado para mapear 1:1 con una tabla `products` en Supabase/Postgres.

export type SkinType =
  | "seca"
  | "grasa"
  | "mixta"
  | "sensible"
  | "todo tipo de piel";

export interface Product {
  id: string; // uuid en la base de datos
  slug: string; // usado en /productos/[slug]
  name: string;
  shortDescription: string;
  price: number; // en MXN, en centavos si conectas Stripe (aquí en unidades para simplicidad)
  currency: "MXN";
  presentation: string; // ej. "50 ml"
  skinTypes: SkinType[];
  benefits: string[];
  ingredients: string[];
  howToUse: string[];
  image: {
    // Placeholder ilustrado mientras no hay fotografía de producto real.
    // Al conectar Supabase Storage, reemplaza por una URL real aquí.
    gradientFrom: string;
    gradientTo: string;
  };
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
