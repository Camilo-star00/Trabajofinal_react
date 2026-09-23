import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext(null);
const CLAVE_CARRITO = "carrito";

// Se lee el carrito desde el LocalStorage para conservar la compra entre recargas.
function leerCarritoDesdeStorage() {
  if (typeof window === "undefined") return [];

  try {
    const data = window.localStorage.getItem(CLAVE_CARRITO);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // El estado se inicializa con los datos guardados para que el carrito persista.
  const [carrito, setCarrito] = useState(() => leerCarritoDesdeStorage());

  // Cada cambio en el carrito se sincroniza con LocalStorage para cumplir el requisito
  // de que el carrito quede persistente y pueda vaciarse correctamente.
  useEffect(() => {
    // Evitamos ejecutar en servidor (SSR) y protegemos el acceso a window.
    if (typeof window === "undefined") return;

    try {
      // Si el carrito está vacío eliminamos la clave del LocalStorage en lugar
      // de escribir un array vacío. Esto hace que `localStorage.getItem("carrito")`
      // devuelva null y cumple la condición de dejar la variable 'carrito' vacía.
      if (carrito.length === 0) {
        window.localStorage.removeItem(CLAVE_CARRITO);
      } else {
        // Guardamos el carrito serializado cuando contiene elementos.
        window.localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
      }
    } catch (e) {
      // Si falla el acceso a LocalStorage no rompemos la app; lo registramos en consola
      // para facilitar debugging durante el desarrollo.
      // Nota: en producción se podría enviar este error a un servicio de logs.
      // console.error('Error sincronizando carrito en LocalStorage', e);
    }
  }, [carrito]);

  // useCallback se usa para mantener las referencias y evitar renderizados innecesarios
  // al pasar funciones a componentes hijos como tarjetas, panel del carrito y botones.
  const agregarAlCarrito = useCallback((personaje) => {
    setCarrito((prev) => {
      const yaExiste = prev.find((item) => item.id === personaje.id);

      if (yaExiste) {
        return prev.map((item) =>
          item.id === personaje.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: personaje.id,
          name: personaje.name,
          image: personaje.image,
          precio: Number(personaje.price ?? personaje.precio ?? 0),
          cantidad: 1,
          episodio: personaje.episodio || personaje.primeraAparicion || "Sin episodio",
        },
      ];
    });
  }, []);

  const actualizarCantidad = useCallback((id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(1, Number(nuevaCantidad) || 1) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }, []);

  
  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => {
    // Se actualiza el estado local y el efecto anterior se encargará de limpiar
    // la clave en LocalStorage (o almacenarla) según corresponda.
    // carga un nuevo arreglo ,osea reemplaza el que ya existe y lo cambia por un arreglo vacio
    setCarrito([]);
  }, []);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalItems,
        subtotal,
        iva,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
