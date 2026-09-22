import { Link } from "react-router-dom"; // Importa Link para navegar entre rutas sin recargar la página.
import { useState } from "react"; // Hook para manejar el estado del login y perfil.
import { Moon, Sun, ShoppingCart, User, LogOut } from "lucide-react"; // Iconos para carrito, modo oscuro, perfil y cierre de sesión.
import Swal from "sweetalert2"; // Librería para alertas bonicas al cerrar sesión.

import { useTheme } from "../../contexts/ThemeContext"; // Contexto global del tema claro/oscuro.
import { useCart } from "../../contexts/CartContext"; // Contexto global del carrito.
import { useAuth } from "../../contexts/AuthContext"; // Contexto global de autenticación.
import Navbar from "../../navbar"; // Menú de navegación principal.
import Login from "./img/Auth/login"; // Modal de login del proyecto.

import monito from "./img/monito.jpg"; // Imagen del logo del sitio.

function Cabecera({ onOpenCart }) {
  const { tema, cambiarTema } = useTheme(); // Obtiene el estado actual del tema y la función para cambiarlo.
  const { totalItems } = useCart(); // Número total de elementos en el carrito para mostrar contador.
  const { usuario, login, logout } = useAuth(); // Usuario actual y funciones de autenticar/cerrar sesión.
  const [mostrarLogin, setMostrarLogin] = useState(false); // Controla si se muestra el modal de login.
  const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false); // Controla si se abre el menú del perfil.

  const manejarLogin = (data) => {
    login(data);
    setMostrarLogin(false);
  };

  const cerrarSesion = async () => {
    const resultado = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará y volverás al bosque misterioso.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
    });

    if (resultado.isConfirmed) {
      logout();
      setMenuPerfilAbierto(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-orange-500/20 bg-[linear-gradient(90deg,#1f2937,#2d1d1d,#1f2937)] text-white shadow-lg shadow-black/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          aria-label="Ir al inicio"
        >
          <img
            src={monito}
            alt="Logo Mystery Shack"
            className="h-10 w-10 rounded-full border-2 border-orange-300 object-cover sm:h-12 sm:w-12"
          />
          <span className="hidden text-base font-black text-orange-200 sm:inline">
            Mystery Shack
          </span>
        </Link>

        <div className="hidden flex-1 justify-center px-4 sm:flex">
          <Navbar />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-1.5 text-[10px] font-medium text-white transition hover:bg-white/20 sm:gap-1.5 sm:px-2 sm:text-xs"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={14} className="sm:size-5" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-bold text-slate-900">
              {totalItems}
            </span>
          </button>

          <button
            type="button"
            onClick={cambiarTema}
            title={
              tema === "claro"
                ? "Cambiar a modo oscuro"
                : "Cambiar a modo claro"
            }
            className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
          >
            {tema === "claro" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {!usuario ? (
            <button
              type="button"
              onClick={() => setMostrarLogin(true)}
              className="rounded-lg bg-orange-400 px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-orange-300 sm:px-4 sm:text-sm"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuPerfilAbierto((estado) => !estado)}
                className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-2 text-xs font-medium text-white transition hover:bg-white/20 sm:gap-2 sm:px-3 sm:text-sm"
                aria-label="Abrir perfil"
              >
                <User size={16} />
                <span className="hidden sm:inline">{usuario.nombre}</span>
              </button>

              {menuPerfilAbierto && (
                <div className="absolute right-0 top-14 w-48 rounded-lg border border-slate-200 bg-white p-3 text-slate-800 shadow-xl sm:w-56">
                  <div className="mb-3 border-b border-slate-200 pb-2">
                    <p className="text-sm font-semibold">Perfil</p>
                    <p className="text-xs text-slate-500">{usuario.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={cerrarSesion}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-700/50 px-2 py-2 sm:hidden">
        <Navbar />
      </div>

      {mostrarLogin && (
        <Login cerrar={() => setMostrarLogin(false)} onLogin={manejarLogin} />
      )}
    </header>
  );
}

export default Cabecera;