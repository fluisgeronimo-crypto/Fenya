import { Product } from "@/types/product";

// Datos de ejemplo. Cuando conectes Supabase, esta lista deja de usarse:
// lib/products.ts hará el query real y devolverá el mismo tipo `Product`.
export const seedProducts: Product[] = [
  {
    id: "1",
    slug: "bruma-de-rosas",
    name: "Bruma de Rosas",
    shortDescription:
      "Tónico facial en spray, hidratación instantánea con agua de rosas y niacinamida.",
    price: 380,
    currency: "MXN",
    presentation: "100 ml",
    skinTypes: ["todo tipo de piel", "sensible"],
    benefits: [
      "Hidrata y refresca al instante",
      "Equilibra el pH de la piel",
      "Prepara la piel para el resto de la rutina",
      "Reduce el enrojecimiento",
    ],
    ingredients: [
      "Agua de rosas orgánica",
      "Niacinamida 2%",
      "Glicerina vegetal",
      "Extracto de aloe vera",
    ],
    howToUse: [
      "Agita bien antes de usar",
      "Cierra los ojos y aplica sobre el rostro limpio",
      "Deja secar al aire o da toques suaves con las manos",
      "Úsalo mañana y noche, antes del sérum",
    ],
    image: { gradientFrom: "#F3E0DC", gradientTo: "#E7DDD0" },
    featured: true,
  },
  {
    id: "2",
    slug: "serum-luz-de-seda",
    name: "Sérum Luz de Seda",
    shortDescription:
      "Concentrado iluminador con vitamina C suave, para un tono uniforme y luminoso.",
    price: 620,
    currency: "MXN",
    presentation: "30 ml",
    skinTypes: ["mixta", "grasa", "todo tipo de piel"],
    benefits: [
      "Unifica el tono de la piel",
      "Aporta luminosidad natural",
      "Ayuda a difuminar marcas leves",
      "Textura ligera, se absorbe rápido",
    ],
    ingredients: [
      "Vitamina C estabilizada 10%",
      "Ácido ferúlico",
      "Extracto de té verde",
      "Ácido hialurónico",
    ],
    howToUse: [
      "Aplica 2-3 gotas sobre rostro limpio y seco",
      "Da toques suaves hasta absorber por completo",
      "Sigue con tu hidratante",
      "Úsalo por la mañana; usa protector solar durante el día",
    ],
    image: { gradientFrom: "#DCAFAA", gradientTo: "#F3E0DC" },
    featured: true,
  },
  {
    id: "3",
    slug: "crema-nube",
    name: "Crema Nube",
    shortDescription:
      "Hidratante en gel-crema, textura ligera con ácido hialurónico y manteca de karité.",
    price: 540,
    currency: "MXN",
    presentation: "50 ml",
    skinTypes: ["seca", "sensible", "todo tipo de piel"],
    benefits: [
      "Hidratación profunda sin sensación grasosa",
      "Fortalece la barrera de la piel",
      "Calma la piel sensible o irritada",
      "Ideal para uso diario, día y noche",
    ],
    ingredients: [
      "Ácido hialurónico multi-peso",
      "Manteca de karité",
      "Ceramidas",
      "Escualano vegetal",
    ],
    howToUse: [
      "Aplica una cantidad del tamaño de una moneda",
      "Distribuye en rostro y cuello con movimientos ascendentes",
      "Usa como último paso de tu rutina, día y noche",
    ],
    image: { gradientFrom: "#E7DDD0", gradientTo: "#FBF6F1" },
    featured: true,
  },
  {
    id: "4",
    slug: "limpiador-petalo",
    name: "Limpiador Pétalo",
    shortDescription:
      "Gel limpiador suave que retira impurezas sin resecar la piel.",
    price: 320,
    currency: "MXN",
    presentation: "150 ml",
    skinTypes: ["todo tipo de piel", "grasa", "mixta"],
    benefits: [
      "Limpia a fondo sin dejar la piel tirante",
      "Remueve maquillaje ligero y protector solar",
      "Mantiene el manto hidrolipídico",
    ],
    ingredients: [
      "Tensioactivos suaves de origen vegetal",
      "Extracto de manzanilla",
      "Pantenol",
    ],
    howToUse: [
      "Humedece el rostro con agua tibia",
      "Masajea una pequeña cantidad por 30 segundos",
      "Enjuaga y continúa con la Bruma de Rosas",
    ],
    image: { gradientFrom: "#F3E0DC", gradientTo: "#DCAFAA" },
  },
];
