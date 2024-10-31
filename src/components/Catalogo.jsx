import React from 'react';

export default function Catalogo({ productos, onProductoClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="border rounded-lg p-4 shadow-lg cursor-pointer"
          onClick={() => onProductoClick(producto)}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h2 className="text-xl font-semibold">{producto.nombre}</h2>
          <p className="text-gray-500">{producto.descripcion}</p>
          <p className="text-blue-600 font-bold mt-2">Q{producto.precio}</p>
        </div>
      ))}
    </div>
  );
}
