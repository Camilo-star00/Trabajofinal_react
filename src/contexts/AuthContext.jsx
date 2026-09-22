import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext(null);
const CLAVE_USUARIO = 'usuario';

function leerUsuarioDesdeStorage() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CLAVE_USUARIO);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // Inicializamos con el usuario guardado para persistir la sesión entre recargas.
  const [usuario, setUsuario] = useState(() => leerUsuarioDesdeStorage());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (usuario === null) {
        // Si no hay usuario removemos la clave para que LocalStorage quede vacío.
        window.localStorage.removeItem(CLAVE_USUARIO);
      } else {
        window.localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
      }
    } catch (e) {
      // Evitar que errores de LocalStorage rompan la app en entornos restringidos.
      // console.error('Auth localstorage error', e);
    }
  }, [usuario]);

  // useCallback evita recrear funciones en cada render y ayuda a la optimización.
  const login = useCallback((data) => {
    // Almacenar sólo la información necesaria del usuario.
    const u = {
      nombre: data.email?.split('@')[0] || 'Usuario',
      email: data.email,
    };
    setUsuario(u);
  }, []);

  const logout = useCallback(() => {
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
