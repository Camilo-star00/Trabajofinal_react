// App styles handled via Tailwind utilities in components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

import Escenario from './pages/Escenario/Escenario';
import Layout from './layout';
import Inicio from './pages/inicio/inicio';
import Catalogo from './pages/catalogo/productos';
import Contacto from './pages/contacto/contacto';


function App() {
  // Se envuelven todas las rutas con ThemeProvider y CartProvider para que el estado global
  // esté disponible sin duplicar lógica en cada componente. Esto es una buena práctica con Context API.
  return (
    // AuthProvider envuelve a la app para proporcionar estado de usuario y
    // funciones de login/logout en todos los componentes (Header, rutas, etc.).
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/diviertete" element={<Escenario />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;