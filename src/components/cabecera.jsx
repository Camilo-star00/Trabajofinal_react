import { Link } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun, ShoppingCart, User, LogOut, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";


import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

import Navbar from "../navbar";

import Login from "../Auth/Login";


import monito from "./layaout/img/monito.jpg";

function Cabecera({ onOpenCart }) {
  const { tema, cambiarTema } = useTheme();
  const { totalItems } = useCart();
  const { usuario, login, logout } = useAuth();
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [menuPerfilAbierto, setMenuPerfilAbierto] = useState(false);

  // Datos quemados para mostrar cuando la sesión esté iniciada
  const datosUsuarioQuemados = {
    bio: "Explorador del universo Disney y coleccionista oficial de artefactos mágicos.",
    rol: "Analista de qkas",
    nivel: "Nivel gran maestro"
  };

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
        
        {/* LOGO Y FOTO DE PERFIL: Solo se ven si la sesión está iniciada */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          aria-label="Ir al inicio"
        >
          {usuario && (
            <img
              src={usuario.avatar || monito}
              alt="Foto de perfil"
              className="h-10 w-10 rounded-full border-2 border-orange-400 object-cover shadow-sm sm:h-12 sm:w-12 transition transform hover:scale-105"
            />
          )}
          <span className="text-base font-black text-orange-200 sm:inline">
            DISNEY
          </span>
        </Link>

        {/* Menú de Navegación Principal */}
        <div className="hidden flex-1 justify-center px-4 sm:flex">
          <Navbar />
        </div>

        {/* Acciones del Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Botón Carrito */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex items-center gap-1 rounded-md bg-white/10 px-2 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 sm:gap-1.5 sm:px-3"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Carrito</span>
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-bold text-slate-900">
              {totalItems}
            </span>
          </button>

          {/* Botón Cambiar Tema */}
          <button
            type="button"
            onClick={cambiarTema}
            title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            className="rounded-full border border-white/20 p-2 text-white transition hover:bg-white/10"
          >
            {tema === "claro" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Estado de Autenticación */}
          {!usuario ? (
            <button
              type="button"
              onClick={() => setMostrarLogin(true)}
              className="rounded-lg bg-orange-400 px-3 py-2 text-xs font-bold text-slate-900 transition hover:bg-orange-300 sm:px-4 sm:text-sm cursor-pointer shadow-md"
            >
              Iniciar Sesión
            </button>
          ) : (
            <div className="relative">
              {/* Botón del Perfil de Usuario */}
              <button
                type="button"
                onClick={() => setMenuPerfilAbierto((estado) => !estado)}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-white/20 border border-orange-400/30 sm:text-sm cursor-pointer"
                aria-label="Abrir perfil"
              >
                <User size={16} className="text-orange-300" />
                <span className="font-semibold">{usuario.nombre || "Usuario"}</span>
              </button>

              {/* Menú Desplegable de Perfil con Datos Quemados */}
              {menuPerfilAbierto && (
                <div className="absolute right-0 top-12 w-64 rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-100 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <img
                      src={usuario.avatar || monito}
                      alt="Avatar"
                      className="h-12 w-12 rounded-full border-2 border-orange-400 object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-orange-200">{usuario.nombre || "Usuario VIP"}</p>
                      <p className="text-xs text-slate-400 truncate">{usuario.email || "usuario@disney.com"}</p>
                    </div>
                  </div>

                  {/* Descripción y Datos Quemados */}
                  <div className="my-3 space-y-2 rounded-lg bg-slate-800/60 p-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-orange-400">
                      <span className="flex items-center gap-1">
                        <ShieldCheck size={14} /> {datosUsuarioQuemados.rol}
                      </span>
                      <span className="rounded bg-orange-500/20 px-1.5 py-0.5">{datosUsuarioQuemados.nivel}</span>
                    </div>
                    <p className="italic text-slate-400 leading-tight">
                      "{datosUsuarioQuemados.bio}"
                    </p>
                  </div>

                  {/* Botón Cerrar Sesión */}
                  <button
                    type="button"
                    onClick={cerrarSesion}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-500/10 py-2 text-xs font-bold text-rose-400 transition hover:bg-rose-500/20 cursor-pointer"
                  >
                    <LogOut size={14} />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Menú Móvil */}
      <div className="border-t border-slate-700/50 px-2 py-2 sm:hidden">
        <Navbar />
      </div>

      {/* Modal de Login */}
      {mostrarLogin && (
        <Login cerrar={() => setMostrarLogin(false)} onLogin={manejarLogin} />
      )}
    </header>
  );
}

export default Cabecera;