import { useState, useEffect } from 'react';

function mapearPersonaje(personaje, index) {
  const imagen = personaje.imageUrl || 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80';

  const quoteBase = Array.isArray(personaje.films) && personaje.films.length
    ? `"${personaje.films[0]}"`
    : Array.isArray(personaje.tvShows) && personaje.tvShows.length
      ? `"${personaje.tvShows[0]}"`
      : '"La aventura más extraña empieza aquí."';

  const episodio = Array.isArray(personaje.tvShows) && personaje.tvShows.length
    ? personaje.tvShows[0]
    : Array.isArray(personaje.films) && personaje.films.length
      ? personaje.films[0]
      : 'Mystery Shack';

  return {
    id: personaje._id ?? index + 1,
    name: personaje.name ?? 'Personaje misterioso',
    image: imagen,
    quote: quoteBase,
    episode: episodio,
    brand: index % 2 === 0 ? 'Mystery Shack' : 'Bosque Misterioso',
    category: index % 2 === 0 ? 'Misterio' : 'Aventura',
    rating: Number((4.1 + (index % 5) * 0.3).toFixed(1)),
    stock: 8 + ((index * 3) % 12),
    description: `${personaje.name || 'Este personaje'} forma parte del mundo mágico de Disney, con un estilo que encaja muy bien con la temática de Gravity Falls.`,
    price: 22000 + index * 7000,
    status: (8 + ((index * 3) % 12)) > 10 ? 'Disponible' : 'Bajo stock',
  };
}

export function useCharacters(page = 1, limit = 8) {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let activo = true;

    async function cargarPersonajes() {
      try {
        setCargando(true);
        setError(null);

        const url = `https://api.disneyapi.dev/character?page=${page}&pageSize=${limit}`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error('No se pudo cargar la información de Disney');
        }

        const data = await res.json();
        const lista = Array.isArray(data.data) ? data.data : [];
        const personajesMapeados = lista.map(mapearPersonaje);

        if (activo) {
          setPersonajes(personajesMapeados);
          setTotalPages(data.info?.totalPages || 1);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || 'Ocurrió un error al cargar los personajes');
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarPersonajes();

    return () => {
      activo = false;
    };
  }, [page, limit]);

  return { personajes, cargando, error, totalPages };
}