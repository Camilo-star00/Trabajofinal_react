import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useCart } from '../../contexts/CartContext';

function formatearPrecio(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor);
}

function CarritoPanel({ isOpen, onClose }) {
  const {
    carrito,
    subtotal,
    iva,
    total,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useCart();

  // Maneja la confirmación del pedido y limpia el carrito si confirma.
  const manejarPedido = async () => {
    const resultado = await Swal.fire({
      title: '¿Deseas enviar este pedido?',
      text: 'La compra se registrará y el carrito quedará vacío.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Enviar pedido',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#f59e0b',
    });

    if (!resultado.isConfirmed) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      vaciarCarrito();
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Pedido enviado',
        text: 'Tu solicitud fue registrada correctamente.',
        confirmButtonColor: '#f59e0b',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo enviar',
        text: 'Intenta nuevamente en unos segundos.',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm">
      <aside className="flex h-full w-[18rem] flex-col overflow-y-auto bg-[#1d1a1a] shadow-2xl sm:w-80">
        <div className="flex items-center justify-between border-b border-orange-500/20 bg-[linear-gradient(90deg,#2a1d1d,#1f2937,#2b211d)] p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-orange-400/15 p-1.5 text-orange-300">
              <ShoppingBag size={10} />
            </div>
            <div>
              <h2 className="text-base font-bold text-orange-100">Carrito</h2>
              <p className="text-xs text-orange-100/80">
                {carrito.length} item{carrito.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-orange-100 transition hover:bg-white/10"
            aria-label="Cerrar carrito"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-3">
          {carrito.length === 0 ? (
            <div className="rounded-lg border border-dashed border-orange-400/30 bg-[#2a1f1a] p-4 text-center text-sm text-orange-100/80">
              Tu carrito está vacío
            </div>
          ) : (
            carrito.map((item) => (
              <article
                key={item.id}
                className="flex gap-2 rounded-lg border border-orange-500/15 bg-[#2a1f1a] p-2 text-xs"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 flex - shrink-0 rounded object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-xs font-semibold text-orange-50">{item.name}</h3>
                  <p className="mt-0.5 text-[10px] text-orange-100/70">{item.episodio}</p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 rounded border border-orange-500/25 bg-[#1a1718]">
                      <button
                        type="button"
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                        className="p-0.5 text-orange-100 transition hover:bg-white/5"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-4 text-center text-xs font-semibold text-orange-100">{item.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                        className="p-0.5 text-orange-100 transition hover:bg-white/5"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="rounded p-0.5 text-rose-300 transition hover:bg-rose-500/10"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <p className="mt-1 text-xs font-bold text-orange-300">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="space-y-2 border-t border-orange-500/20 bg-[#120f12] p-3 text-xs text-orange-100/80">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatearPrecio(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>IVA (19%)</span>
              <span className="font-semibold">{formatearPrecio(iva)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-orange-500/20 pt-2 text-sm font-bold text-orange-50">
              <span>Total</span>
              <span>{formatearPrecio(total)}</span>
            </div>

            <button
              type="button"
              onClick={manejarPedido}
              className="mt-3 w-full rounded-lg bg-orange-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-orange-300"
            >
              Enviar Pedido
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CarritoPanel;
