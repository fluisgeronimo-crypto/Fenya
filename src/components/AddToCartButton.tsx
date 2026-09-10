"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full bg-rose px-8 py-3.5 text-sm tracking-wide text-ivory transition-colors hover:bg-rose-deep"
    >
      {added ? "AGREGADO ✓" : "AGREGAR AL CARRITO"}
    </button>
  );
}
