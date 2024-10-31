import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Asegúrate de tenerlo instalado

export default function Filtro({ categorias, setCategoriaSeleccionada }) {
  const [mostrarTodas, setMostrarTodas] = useState(false);

  const handleMostrarTodas = () => setMostrarTodas(!mostrarTodas);

  const categoriasVisibles = categorias.slice(0, 3); // Primera fila
  const categoriasOcultas = categorias.slice(3); // Categorías adicionales

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Primera fila: Botón "Todos" fijo y categorías visibles */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setCategoriaSeleccionada('Todos')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Todos
        </button>

        {categoriasVisibles.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSeleccionada(categoria)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Contenedor con animación para las categorías adicionales */}
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          mostrarTodas ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {categoriasOcultas.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Botón de flecha con animación de rebote */}
      {categoriasOcultas.length > 0 && (
        <button
          onClick={handleMostrarTodas}
          className="text-blue-500 mt-2 transition-transform duration-500 animate-bounceSlow"
          style={{ transform: mostrarTodas ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          {mostrarTodas ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      )}
    </div>
  );
}
