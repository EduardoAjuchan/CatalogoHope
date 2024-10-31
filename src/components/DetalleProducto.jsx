import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { productos as listaProductos } from '../data';
import { FaTruck, FaChevronDown, FaChevronUp, FaBoxes } from 'react-icons/fa'; // Importamos el nuevo icono

function DetalleProducto() {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const producto = listaProductos.find((p) => p.id === parseInt(id)); // Buscar el producto por ID

  const [envioAbierto, setEnvioAbierto] = useState(false); // Estado para el acordeón de detalles de envío

  const toggleEnvio = () => setEnvioAbierto((prev) => !prev); // Alternar visibilidad del contenido

  if (!producto) {
    return <p className="text-center mt-4">Producto no encontrado.</p>;
  }

  return (
    <div className="flex flex-col items-center mt-8 px-4">
      {/* Imagen con esquinas redondeadas */}
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-80 h-80 object-contain rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{producto.nombre}</h1>
      <p className="text-xl text-green-600 mb-4">Precio: Q{producto.precio}</p>
      <p className="text-gray-700 text-center max-w-lg mb-8">{producto.descripcion}</p>

      {/* Disponible al por mayor */}
      <div className="w-full max-w-lg mb-4 flex items-center gap-2">
        <FaBoxes className="text-blue-600" /> {/* Icono de caja */}
        <span className="text-lg font-semibold text-gray-700">Disponible al por mayor</span>
      </div>

      {/* Envío a domicilio */}
      <div className="w-full max-w-lg mb-6 flex items-center gap-2">
        <FaTruck className="text-blue-600" /> {/* Icono de camión */}
        <span className="text-lg font-semibold text-gray-700">Envío a domicilio</span>
      </div>

      {/* Sección de detalles adicionales con acordeón */}
      <div className="w-full max-w-lg mb-12">
        <div
          className="border-t border-gray-300 py-4 flex justify-between items-center cursor-pointer"
          onClick={toggleEnvio}
        >
          <h2 className="text-lg font-semibold text-blue-600">Detalles de envío</h2>
          {envioAbierto ? <FaChevronUp /> : <FaChevronDown />} {/* Icono de flecha */}
        </div>
        {envioAbierto && ( /* Contenido que se despliega */
          <div className="mt-2">
            <p className="text-gray-600">
              El tiempo de entrega de los pedidos es de 24 a 48 horas hábiles en toda la República,
              que se cuentan después de la validación del consumo con el banco emisor del medio de pago.
            </p>
            <p className="text-gray-500 italic mt-2">
              Este tiempo puede aumentar si el banco emisor demora en confirmar el pago realizado
              o si es fin de semana o día festivo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetalleProducto;
