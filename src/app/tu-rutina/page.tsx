import Link from "next/link";

export const metadata = { title: "Tu rutina — FÉNYA" };

const steps = [
  {
    num: "01",
    title: "Limpia",
    text: "Retira impurezas del día con un gel suave, sin resecar la piel.",
    product: "limpiador-petalo",
    productName: "Limpiador Pétalo",
  },
  {
    num: "02",
    title: "Tonifica",
    text: "Equilibra y prepara la piel con la Bruma de Rosas.",
    product: "bruma-de-rosas",
    productName: "Bruma de Rosas",
  },
  {
    num: "03",
    title: "Nutre",
    text: "Aplica el Sérum Luz de Seda para un tono uniforme.",
    product: "serum-luz-de-seda",
    productName: "Sérum Luz de Seda",
  },
  {
    num: "04",
    title: "Sella",
    text: "Cierra el ritual con la Crema Nube, día y noche.",
    product: "crema-nube",
    productName: "Crema Nube",
  },
];

export default function RoutinePage() {
  return (
    <main className="bg-blush py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-14 max-w-[620px]">
          <p className="mb-2.5 text-sm tracking-wide text-rose">
            Tu rutina
          </p>
          <h1 className="font-serif text-4xl italic">
            Un ritual en cuatro pasos
          </h1>
          <p className="mt-3.5 text-ink-soft">
            Así de sencillo es incorporar FÉNYA a tu día, mañana y noche.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl border border-rose/15 bg-ivory p-7"
            >
              <span className="mb-4 block font-serif text-2xl italic text-powder">
                {step.num}
              </span>
              <h3 className="text-base font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.text}</p>
              <Link
                href={`/productos/${step.product}`}
                className="mt-4 inline-block border-b border-powder pb-0.5 text-sm text-ink-soft hover:border-rose-deep hover:text-rose-deep"
              >
                {step.productName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
