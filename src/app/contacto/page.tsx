export const metadata = { title: "Contacto — FÉNYA" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 md:px-8">
      <p className="mb-3 text-sm tracking-wide text-rose">Contacto</p>
      <h1 className="font-serif text-4xl italic">Escríbenos</h1>
      <p className="mt-4 text-ink-soft">
        ¿Dudas sobre tu tipo de piel o tu pedido? Con gusto te ayudamos.
      </p>

      <form className="mt-10 flex flex-col gap-5">
        <div>
          <label className="mb-1.5 block text-xs text-ink-soft">
            Nombre
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-rose"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-ink-soft">
            Correo
          </label>
          <input
            type="email"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-rose"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs text-ink-soft">
            Mensaje
          </label>
          <textarea
            rows={5}
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-rose"
          />
        </div>
        <button
          type="button"
          className="mt-2 w-fit rounded-full bg-rose px-8 py-3.5 text-xs tracking-wide text-ivory transition-colors hover:bg-rose-deep"
        >
          ENVIAR MENSAJE
        </button>
        <p className="text-[11px] text-ink-soft">
          Este formulario aún no envía datos a ningún lado — conéctalo a tu
          proveedor de correo o a una función de servidor cuando estés
          listo.
        </p>
      </form>
    </main>
  );
}
