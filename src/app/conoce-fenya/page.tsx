export const metadata = { title: "Conoce FÉNYA" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 md:px-8">
      <p className="mb-3 text-sm tracking-wide text-rose">Filosofía FÉNYA</p>
      <h1 className="font-serif text-4xl italic leading-tight md:text-5xl">
        Menos complicaciones. Más cuidado.
      </h1>
      <div className="mt-10 flex flex-col gap-6 text-ink-soft">
        <p>
          FÉNYA nace de una idea simple: cuidar tu piel no debería sentirse
          como una tarea más en tu lista de pendientes. Debería sentirse
          como un momento tuyo, dentro del ritmo del día.
        </p>
        <p>
          No se trata de tener diez productos en el baño. Se trata de
          elegir los correctos —pocos, honestos, efectivos— y disfrutar el
          momento en el que te los aplicas.
        </p>
        <p>
          Cada fórmula FÉNYA está pensada para integrarse a tu rutina sin
          complicarla: texturas ligeras, ingredientes que reconoces, y un
          ritual de pocos pasos que puedas sostener todos los días, no solo
          cuando tengas tiempo.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-2.5">
        <span className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft">
          Sin parabenos
        </span>
        <span className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft">
          Cruelty-free
        </span>
        <span className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft">
          Dermatológicamente probado
        </span>
      </div>
    </main>
  );
}
