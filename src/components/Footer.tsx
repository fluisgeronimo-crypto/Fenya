import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="mt-24 bg-ink py-16 text-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 md:grid-cols-4 md:px-8">
        <div className="col-span-2 md:col-span-1">
          <span className="font-serif text-2xl italic text-blush">FÉNYA</span>
          <p className="mt-3 max-w-[32ch] text-sm text-ivory/60">
            Skincare pensado para que el cuidado de tu piel sea un momento
            bonito y sencillo, todos los días.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs tracking-wide text-powder">
            Navegación
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/80">
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/productos">Productos</Link>
            </li>
            <li>
              <Link href="/conoce-fenya">Conoce FÉNYA</Link>
            </li>
            <li>
              <Link href="/tu-rutina">Tu rutina</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs tracking-wide text-powder">Ayuda</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/80">
            <li>Envíos</li>
            <li>Devoluciones</li>
            <li>Preguntas frecuentes</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs tracking-wide text-powder">
            Contacto
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/80">
            <li>
              <a href="mailto:hola@fenya.mx">hola@fenya.mx</a>
            </li>
            <li>@fenya.skin</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-6xl flex-wrap justify-between gap-3 border-t border-ivory/10 px-6 pt-6 text-xs text-ivory/45 md:px-8">
        <span>© 2026 FÉNYA. Todos los derechos reservados.</span>
        <span>Hecho con cuidado.</span>
      </div>
    </footer>
  );
}
