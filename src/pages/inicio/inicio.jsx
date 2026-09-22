function Inicio() {
  const personajes = [
    {
      nombre: "Mickey",
      descripcion: "El emblemático aventurero de Disney, siempre listo para la próxima aventura.",
      icono: "🐭",
    },
    {
      nombre: "Minnie",
      descripcion: "Energía, estilo y alegría para iluminar cualquier historia.",
      icono: "🎀",
    },
    {
      nombre: "Donald",
      descripcion: "Un personaje de carácter, humor y emoción en cada escena.",
      icono: "🦆",
    },
    {
      nombre: "Goofy",
      descripcion: "La amistad y la diversión más entrañables del universo Disney.",
      icono: "🐶",
    },
  ];

  const motivos = [
    {
      titulo: "Magia Disney",
      descripcion: "Explora personajes, mundos y recuerdos icónicos del universo Disney.",
      icono: "✨",
    },
    {
      titulo: "Aventuras inolvidables",
      descripcion: "Cada personaje cuenta historias llenas de imaginación, amistad y fantasía.",
      icono: "🌈",
    },
    {
      titulo: "Diseño encantador",
      descripcion: "Una interfaz con colores cálidos, vibrantes y llenos de nostalgia.",
      icono: "🎨",
    },
    {
      titulo: "Fan experience",
      descripcion: "Todo pensado para los amantes del cine, la animación y la magia Disney.",
      icono: "🎬",
    },
  ];

  return (
    <main className="min-h-screen bg-[#1a1c1e] text-[#f5e7d3]">
      <section className="bg-[radial-gradient(circle_at_top,#3d2a1f,#1b1b1d_45%,#0d0d0f_100%)]">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="magic-fade flex flex-col items-center text-center">
            <div className="magic-float mb-6 text-6xl sm:text-8xl">🎡</div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.5em] text-orange-300">
              Disney universe
            </p>
            <h1 className="mb-6 text-4xl font-black md:text-6xl">
              Bienvenidos al mundo mágico de Disney
            </h1>
            <p className="mb-8 max-w-3xl text-lg text-[#f1d8b4] md:text-xl">
              Descubre personajes y mundos del universo Disney con una experiencia visual inspirada en la nostalgia, la imaginación y la aventura.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/catalogo"
                className="inline-block rounded-full bg-orange-400 px-8 py-3 font-semibold text-slate-950 transition hover:bg-orange-300 magic-glow"
              >
                Ver personajes
              </a>
              <a
                href="/contacto"
                className="inline-block rounded-full border border-orange-300/50 bg-white/5 px-8 py-3 font-semibold text-orange-100 transition hover:bg-white/10"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold text-orange-200 md:text-4xl">
          Personajes emblemáticos
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-[#d6c0a0]">
          Un viaje visual por los personajes más queridos del universo Disney.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {personajes.map((personaje) => (
            <div
              key={personaje.nombre}
              className="magic-glow rounded-2xl border border-orange-400/20 bg-[#2a1f1a] p-6 text-center shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-orange-300"
            >
              <div className="mb-4 text-5xl">{personaje.icono}</div>
              <h3 className="mb-3 text-xl font-bold text-[#f8e7c4]">{personaje.nombre}</h3>
              <p className="text-sm text-[#d8c5a6]">{personaje.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#120f12]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-orange-200 md:text-4xl">
            ¿Por qué esta experiencia?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {motivos.map((motivo) => (
              <div key={motivo.titulo} className="rounded-xl border border-[#4a3229] bg-[#211a1b] p-6 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-orange-400/40">
                <div className="mb-3 text-4xl">{motivo.icono}</div>
                <h3 className="mb-2 text-lg font-bold text-[#f6d3a1]">{motivo.titulo}</h3>
                <p className="text-sm text-[#d5bc9b]">{motivo.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,#f59e0b,#f97316,#fb7185)] text-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="mb-4 text-3xl font-black md:text-4xl">¡La magia continúa!</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-900/80">
            Descubre personajes del universo Disney y vive una experiencia llena de nostalgia, imaginación y aventura.
          </p>
          <a href="/catalogo" className="inline-block rounded-full bg-slate-950 px-8 py-3 font-semibold text-orange-300 transition hover:bg-slate-900">
            Ir al catálogo
          </a>
        </div>
      </section>

      <footer className="bg-[#0d0d0f] py-8 text-center text-[#d8c5a6]">
        <p>Disney Universe © 2026 · Fan page</p>
      </footer>
    </main>
  );
}

export default Inicio;