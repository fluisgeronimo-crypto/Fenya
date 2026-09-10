# FÉNYA — sitio web

Tienda de skincare completa: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + Supabase + Stripe**.

El código ya está 100% escrito y conectado. Lo único que falta es que tú crees tus propias cuentas de Supabase, Stripe y Vercel, y pegues las llaves — nadie más que tú debe tener acceso a esas llaves.

## 1. Instalar y correr en local

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Sin llenar `.env.local`, el sitio funciona igual pero con productos de ejemplo (`lib/seed-products.ts`) y sin poder cobrar. Para que sea el proyecto real, sigue los pasos siguientes.

## 2. Conectar Supabase (base de datos real)

1. Crea una cuenta y un proyecto en https://app.supabase.com
2. Ve a **SQL Editor** → pega y corre el SQL que está en `src/lib/supabase.ts` (crea las tablas `products` y `orders`)
3. Carga tus productos reales en la tabla `products` (puedes hacerlo desde el **Table Editor** de Supabase, fila por fila, o por CSV)
4. Ve a **Settings → API** y copia:
   - `Project URL` → pégalo en `.env.local` como `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → pégalo como `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Reinicia `npm run dev` — el sitio ahora lee productos directo de tu base de datos, sin tocar código.

## 3. Conectar Stripe (pagos reales)

1. Crea una cuenta en https://dashboard.stripe.com (modo de prueba primero, para no cobrar de verdad todavía)
2. Ve a **Developers → API keys** y copia la **Secret key** → pégala en `.env.local` como `STRIPE_SECRET_KEY`
3. Corre `npm run dev` y prueba comprar algo: el botón "IR A PAGAR" del carrito ya te lleva a un Checkout real de Stripe (usa la tarjeta de prueba `4242 4242 4242 4242`, cualquier fecha futura y CVC)
4. Cuando despliegues en Vercel (paso 4), ve a **Developers → Webhooks → Add endpoint** en Stripe:
   - URL: `https://tu-dominio.vercel.app/api/webhooks/stripe`
   - Evento: `checkout.session.completed`
   - Copia el **Signing secret** → agrégalo en Vercel como `STRIPE_WEBHOOK_SECRET`
5. Cuando ya quieras cobrar de verdad, cambia a tus llaves de modo "Live" en Stripe.

## 4. Publicar en Vercel (URL real)

1. Sube este proyecto a un repositorio de GitHub (crea uno nuevo y sube estos archivos)
2. Entra a https://vercel.com, inicia sesión con GitHub, y elige **Add New → Project**
3. Selecciona el repositorio de FÉNYA
4. En **Environment Variables**, agrega las mismas 4 variables de tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (la agregas después de crear el webhook, ver paso 3.4 con la URL de Vercel)
5. Click **Deploy** — en un par de minutos tienes tu URL real (`fenya-xxxx.vercel.app`), y puedes conectar tu propio dominio (`fenya.mx`) desde **Settings → Domains**

## Estructura

```
src/
├── app/
│   ├── page.tsx                        → Inicio
│   ├── productos/page.tsx              → Listado de productos
│   ├── productos/[slug]/page.tsx       → Ficha de producto
│   ├── conoce-fenya/page.tsx           → Filosofía de la marca
│   ├── tu-rutina/page.tsx              → Rutina en 4 pasos
│   ├── contacto/page.tsx               → Formulario de contacto
│   ├── pedido-confirmado/page.tsx      → Confirmación tras pagar
│   └── api/
│       ├── checkout/route.ts           → Crea la sesión de Stripe Checkout
│       └── webhooks/stripe/route.ts    → Guarda el pedido en Supabase al confirmarse el pago
├── components/                         → Navbar, Footer, ProductCard, CartDrawer, AddToCartButton
├── context/CartContext.tsx             → Carrito (TypeScript + localStorage)
├── lib/
│   ├── products.ts                     → Lee de Supabase si está configurado; si no, de seed-products.ts
│   ├── seed-products.ts                → Datos de ejemplo
│   ├── supabase.ts                     → Cliente de Supabase + esquema SQL
│   └── stripe.ts                       → Cliente de Stripe
└── types/product.ts                    → Tipos compartidos
```

## Sistema de diseño

| Token | Valor |
|---|---|
| `ivory` | `#FBF6F1` |
| `blush` | `#F3E0DC` |
| `powder` | `#DCAFAA` |
| `rose` | `#B97C78` |
| `rose-deep` | `#A2645F` |
| `sand` | `#E7DDD0` |
| `ink` | `#3E322F` |
| `ink-soft` | `#6B5C57` |

Tipografías: **Cormorant Garamond** (títulos, itálica) + **Jost** (texto, UI), cargadas vía `next/font/google` en `src/app/layout.tsx`.
