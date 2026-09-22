import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCharacters } from '../../hooks/usecharacters';
import CharacterCard from '../../components/catalogo/characteCArd';

function Productos() {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 8;
  const { personajes, cargando, error, totalPages } = useCharacters(paginaActual, elementosPorPagina);

  // Forzamos el límite a máximo 5 páginas
  const maxPaginas = 5;
  const totalPaginasEfectivo = Math.min(totalPages || 1, maxPaginas);

  // Ajusta la página si el usuario está en una posición mayor al límite de 5
  useEffect(() => {
    if (paginaActual > totalPaginasEfectivo) {
      setPaginaActual(totalPaginasEfectivo);
    }
  }, [totalPaginasEfectivo, paginaActual]);

  return (
    <section className="min-h-screen bg-[#1a1c1e] px-6 py-10 text-[#f5e7d3]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">Catálogo</p>
            <h2 className="mt-2 text-3xl font-bold text-[#f7e6c7]">Personajes Disney</h2>
          </div>
          <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-medium text-orange-200 ring-1 ring-orange-400/30">
            {personajes.length} personajes
          </span>
        </div>

        {cargando && (
          <p className="mt-10 text-center text-[#d9c5a4]">Cargando personajes del universo Disney...</p>
        )}

        {error && (
          <p className="mt-10 text-center text-rose-300">{error}</p>
        )}

        {!cargando && !error && (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {personajes.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            {totalPaginasEfectivo > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                {/* Botón Anterior */}
                <button
                  type="button"
                  onClick={() => setPaginaActual((actual) => Math.max(1, actual - 1))}
                  disabled={paginaActual === 1}
                  className="inline-flex items-center gap-2 rounded-lg border border-orange-400/30 bg-[#2b261d] px-3 py-2 text-sm font-medium text-[#f3dcc0] transition hover:border-orange-300 hover:text-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>

                {/* Indicador de página (Tope máximo en 5) */}
                <span className="rounded-lg bg-orange-400 px-3 py-2 text-sm font-semibold text-slate-950">
                  {paginaActual} / {totalPaginasEfectivo}
                </span>

                {/* Botón Siguiente */}
                <button
                  type="button"
                  onClick={() => setPaginaActual((actual) => Math.min(totalPaginasEfectivo, actual + 1))}
                  disabled={paginaActual === totalPaginasEfectivo}
                  className="inline-flex items-center gap-2 rounded-lg border border-orange-400/30 bg-[#2b261d] px-3 py-2 text-sm font-medium text-[#f3dcc0] transition hover:border-orange-300 hover:text-orange-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Productos;