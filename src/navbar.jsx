import { Link } from "react-router-dom"; // Importa Link para navegar entre páginas sin recargar la aplicación.

function Navbar() { // Componente del menú de navegación principal.
  return (
    <nav className="flex-1"> 
      <ul className="menu flex flex-wrap items-center justify-center gap-2 sm:gap-4"> 
        <li>
          <Link
            to="/diviertete" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-orange-100 transition hover:bg-white/10 sm:text-base" 
          >
            Diviértete
          </Link>
        </li>
        <li>
          <Link
            to="/catalogo" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-orange-100 transition hover:bg-white/10 sm:text-base" // Estilo consistente para todos los enlaces.
          >
            Personajes 
          </Link>
        </li>
        <li>
          <Link
            to="/contacto" 
            className="rounded-lg px-3 py-2 text-sm font-medium text-orange-100 transition hover:bg-white/10 sm:text-base" // Estilo del botón para mantener la identidad visual.
          >
            Contacto 
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; // Exporta el componente para incluirlo en la cabecera.