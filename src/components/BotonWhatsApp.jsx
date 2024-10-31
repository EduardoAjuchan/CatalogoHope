import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Asegúrate que react-icons esté instalado

export default function BotonWhatsApp() {
  return (
    <a
      href="https://wa.me/50231871162?text=Hola!%20Quiero%20comprar%20estos%20productos..."
      className="fixed bottom-4 left-4 bg-green-500 rounded-full p-3 shadow-lg hover:bg-green-600 transition-all duration-300"
      style={{ zIndex: 1000 }}
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </a>
  );
}
