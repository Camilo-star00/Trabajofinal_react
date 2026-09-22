import { ShoppingCart } from "lucide-react";
import Swal from "sweetalert2";
import { useCart } from "../../contexts/CartContext";

const estadoColores = {
  Disponible: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Bajo stock": "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  unknown: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
};

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function CharacterCard({ personaje }) {
  const { agregarAlCarrito } = useCart();
  const colorEstado = estadoColores[personaje.status] || estadoColores.unknown;

  const manejarAgregar = () => {
    agregarAlCarrito(personaje);
    Swal.fire({
      icon: "success",
      title: "Personaje añadido",
      text: `${personaje.name} se añadió a tu colección Disney.`,
      timer: 1200,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-orange-500/20 bg-[#2b221d] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/30">
      <div className="relative">
        <img
          src={personaje.image}
          alt={personaje.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${colorEstado}`}
        >
          {personaje.status}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-[#f8e9d1]">{personaje.name}</h3>
          <span className="shrink-0 text-xs text-[#d7c3a0]">#{personaje.id}</span>
        </div>

        <ul className="mt-3 space-y-1 text-sm text-[#d5c2a3]">
          <li>
            <span className="text-[#f0d7a9]">Cita:</span> “{personaje.quote}”
          </li>
          <li>
            <span className="text-[#f0d7a9]">Aventura:</span> {personaje.episode}
          </li>
          <li>
            <span className="text-[#f0d7a9]">Calificación:</span> ⭐ {personaje.rating}
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-orange-300">{formatearPrecio(personaje.price)}</span>
          <button
            type="button"
            onClick={manejarAgregar}
            className="rounded-full bg-orange-400 p-2.5 text-slate-900 transition hover:scale-105 hover:bg-orange-300"
            aria-label={`Agregar ${personaje.name} al carrito`}
            title="Agregar al carrito"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
