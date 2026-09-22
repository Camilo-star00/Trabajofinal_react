import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function obtenerTemaInicial() {
  if (typeof window === "undefined") return "claro";

  const almacenado = window.localStorage.getItem("tema");
  return almacenado || "claro";
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => obtenerTemaInicial());

  const cambiarTema = () => {
    setTema((actual) => (actual === "claro" ? "oscuro" : "claro"));
  };

  useEffect(() => {
    const root = document.documentElement;

    if (tema === "oscuro") {
      root.classList.add("dark");
      window.localStorage.setItem("tema", "oscuro");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("tema", "claro");
    }
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;