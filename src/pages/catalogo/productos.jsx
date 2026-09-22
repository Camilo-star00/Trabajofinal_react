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

  // Ajusta la página si el usuario está en una posición mayor al límite
  useEffect(() => {
    if (paginaActual > totalPaginasEfectivo) {
      setPaginaActual(totalPaginasEfectivo);
    }
  }, [totalPaginasEfectivo, paginaActual]);

  return (
    <section className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#1a1c1e] dark:text-[#f5e7d3] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado del catálogo */}
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
              Catálogo
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-[#f7e6c7]">
              Personajes Disney
            </h2>
          </div>
          <span className="rounded-full bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-200 px-3 py-1 text-sm font-medium border border-orange-200 dark:border-orange-400/30">
            {personajes ? personajes.length : 0} personajes
          </span>
        </div>

        {/* Estado de Carga */}
        {cargando && (
          <div className="mt-10 text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-orange-400 border-r-transparent align-[-0.125em]" />
            <p className="mt-4 text-slate-600 dark:text-[#d9c5a4]">
              Cargando personajes del universo Disney...
            </p>
          </div>
        )}

        {/* Estado de Error */}
        {error && (
          <div className="mt-10 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-6 text-center text-rose-600 dark:text-rose-300">
            {error}
          </div>
        )}

        {/* Listado de Personajes y Paginación */}
        {!cargando && !error && (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {personajes.map((personaje) => (
                <CharacterCard key={personaje.id} personaje={personaje} />
              ))}
            </div>

            {totalPaginasEfectivo > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                {/* Botón Anterior */}
                <button
                  type="button"
                  onClick={() => setPaginaActual((actual) => Math.max(1, actual - 1))}
                  disabled={paginaActual === 1}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white dark:border-orange-400/30 dark:bg-[#2b261d] px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-[#f3dcc0] shadow-sm transition hover:bg-slate-100 dark:hover:border-orange-300 dark:hover:text-orange-100 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  Anterior
                </button>

                {/* Indicador de página */}
                <span className="rounded-lg bg-orange-400 px-3.5 py-2 text-sm font-semibold text-slate-950 shadow-md">
                  {paginaActual} / {totalPaginasEfectivo}
                </span>

                {/* Botón Siguiente */}
                <button
                  type="button"
                  onClick={() => setPaginaActual((actual) => Math.min(totalPaginasEfectivo, actual + 1))}
                  disabled={paginaActual === totalPaginasEfectivo}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white dark:border-orange-400/30 dark:bg-[#2b261d] px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-[#f3dcc0] shadow-sm transition hover:bg-slate-100 dark:hover:border-orange-300 dark:hover:text-orange-100 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
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