import { useState } from 'react';
import Cabecera from "./components/layaout/cabecera";
import CarritoPanel from './components/carrito/CarritoPanel';

function Layout({ children, pagina, setPagina }) {
  // El carrito se maneja como panel lateral para que el usuario siga navegando en la app.
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Cabecera 
        pagina={pagina}
        setPagina={setPagina}
        onOpenCart={() => setCarritoAbierto(true)} 
      />
      <main className="relative">
        {children}
        <CarritoPanel
          isOpen={carritoAbierto}
          onClose={() => setCarritoAbierto(false)}
        />
      </main>
    </div>
  );
}

export default Layout;