import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { productos as listaProductos } from './data';
import Carrusel from './components/Carrusel';
import Catalogo from './components/Catalogo';
import BotonWhatsApp from './components/BotonWhatsApp';
import Footer from './components/Footer';
import DetalleProducto from './components/DetalleProducto';
import logo from './assets/logo.webp';
import './index.css';

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const navigate = useNavigate();
  const inputBusquedaRef = useRef(null);

  const categorias = ['Todos', ...new Set(listaProductos.map((p) => p.categoria))];

  useEffect(() => {
    const filtrados = categoriaSeleccionada === 'Todos'
      ? listaProductos
      : listaProductos.filter((producto) => producto.categoria === categoriaSeleccionada);

    setProductosFiltrados(filtrados);
    setResultados([]);
    setBusqueda('');
    setPaginaActual(1);
    if (menuAbierto) setMenuAbierto(false);
  }, [categoriaSeleccionada]);

  const handleBusqueda = (event) => {
    const valorBusqueda = event.target.value.toLowerCase();
    setBusqueda(valorBusqueda);

    const coincidencias = listaProductos.filter((producto) =>
      producto.nombre.toLowerCase().includes(valorBusqueda)
    );
    setResultados(coincidencias);
  };

  useEffect(() => {
    if (busqueda && inputBusquedaRef.current) {
      inputBusquedaRef.current.focus();
    }
  }, [busqueda, resultados]);

  const limpiarBusqueda = () => {
    setBusqueda('');
    setResultados([]);
  };

  const handleSeleccionProducto = (producto) => {
    limpiarBusqueda();
    setMenuAbierto(false);
    navigate(`/producto/${producto.id}`);
  };

  const handleCategoriaSeleccionada = (categoria) => {
    setCategoriaSeleccionada(categoria);
    limpiarBusqueda();
    if (menuAbierto) setMenuAbierto(false);
    navigate('/');
  };

  const toggleMenu = () => setMenuAbierto((prev) => !prev);

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPaginaActual = productosFiltrados.slice(indiceInicio, indiceInicio + productosPorPagina);

  const numeroDePaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const Layout = ({ children }) => (
    <div className="min-h-screen flex flex-col">
      <div className={`bg-gray-300 text-center text-sm p-2 sticky top-0 z-20 ${menuAbierto ? 'hidden' : ''}`}>
        Envíanos una captura de pantalla de tus productos por WhatsApp
      </div>

      <div className="hidden md:flex navbar items-center">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <div className="navbar-search relative">
          <input
            type="text"
            placeholder="Buscar"
            value={busqueda}
            onChange={handleBusqueda}
            ref={inputBusquedaRef}
            className="border rounded-md p-2 w-full"
          />
          {busqueda && resultados.length > 0 && (
            <ul className="absolute bg-white shadow-md w-full mt-1 max-h-60 overflow-y-auto z-30">
              {resultados.map((producto) => (
                <li
                  key={producto.id}
                  onClick={() => handleSeleccionProducto(producto)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {producto.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="categorias-container">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => handleCategoriaSeleccionada(categoria)}
              className={categoriaSeleccionada === categoria ? 'active' : ''}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      <div className="md:hidden navbar-mobile">
        <button onClick={toggleMenu} className="text-2xl">
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>
        <div className="flex-grow flex justify-center">
          <img src={logo} alt="Logo" className="navbar-mobile-logo" />
        </div>
      </div>

      <div className={`overlay ${menuAbierto ? 'mostrar' : ''}`} onClick={toggleMenu}></div>

      <div className={`menu-lateral ${menuAbierto ? 'abierto' : 'cerrado'}`}>
        <button onClick={toggleMenu} className="text-xl mb-4">
          <FaTimes />
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar"
            value={busqueda}
            onChange={handleBusqueda}
            ref={inputBusquedaRef}
            className="w-full border rounded-md p-2 mb-4"
          />
          {busqueda && resultados.length > 0 && (
            <ul className="absolute bg-white shadow-md w-full mt-1 max-h-60 overflow-y-auto z-30">
              {resultados.map((producto) => (
                <li
                  key={producto.id}
                  onClick={() => handleSeleccionProducto(producto)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {producto.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>
        <h2 className="text-xl font-bold mb-4">Categorías</h2>
        <ul className="space-y-2 font-bold">
          {categorias.map((categoria) => (
            <li key={categoria}>
              <button
                onClick={() => handleCategoriaSeleccionada(categoria)}
                className={`w-full text-left p-2 rounded hover:bg-green-200 ${
                  categoriaSeleccionada === categoria ? 'button-active' : ''
                }`}
              >
                {categoria}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow">{children}</div>

      <BotonWhatsApp />
      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Carrusel />
            <div className="mt-8 px-4 flex-grow">
              {productosPaginaActual.length > 0 ? (
                <>
                  <Catalogo productos={productosPaginaActual} onProductoClick={handleSeleccionProducto} />
                  <div className="paginacion flex justify-center mt-6 mb-8 space-x-2">
                    <button
                      onClick={() => cambiarPagina(paginaActual - 1)}
                      disabled={paginaActual === 1}
                      className="p-2 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                    >
                      <FaArrowLeft className="text-lg" />
                    </button>
                    {Array.from({ length: numeroDePaginas }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => cambiarPagina(i + 1)}
                        className={`p-2 w-10 h-10 rounded-full flex items-center justify-center ${
                          paginaActual === i + 1
                            ? 'bg-[#38652d] text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => cambiarPagina(paginaActual + 1)}
                      disabled={paginaActual === numeroDePaginas}
                      className="p-2 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                    >
                      <FaArrowRight className="text-lg" />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center">No hay productos disponibles.</p>
              )}
            </div>
          </Layout>
        }
      />
      <Route
        path="/producto/:id"
        element={
          <Layout>
            <DetalleProducto />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
