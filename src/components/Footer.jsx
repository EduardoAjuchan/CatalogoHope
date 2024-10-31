import biLogo from '../assets/img/bi.png';
import cuikLogo from '../assets/img/cuik.png';
import banruralLogo from '../assets/img/banrural.png';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

function Footer() {
  return (
    <footer className=" py-6 border-t border-gray-200">
      {/* Redes sociales */}
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.instagram.com/hope_tienda_kawaii?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl text-white-600 hover:text-gray-300" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100093714895509&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-xl text-white-600 hover:text-gray-300" />
        </a>
        <a href="https://www.tiktok.com/@hope_tienda_kawai?_t=8qqMXuqQzcj&_r=1" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="text-xl text-white-600 hover:text-gray-300" />
        </a>
      </div>

      {/* Métodos de pago */}
      <div className="flex justify-center space-x-4 mb-4">
        <img src={biLogo} alt="Banco Industrial" className="h-8 object-contain" />
        <img src={banruralLogo} alt="Banrural" className="h-8 object-contain" />
        <img src={cuikLogo} alt="Cuik" className="h-8 object-contain" />
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-white-500">
        © 2024, Hope Tienda Kawaii. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
