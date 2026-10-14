import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarrito } from '../../context/CarritoContext'
import '../../styles/Navbar.css'

const enlaces = [
  { ruta: '/', texto: 'Inicio' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blog', texto: 'Blog' },
  { ruta: '/contacto', texto: 'Contacto' },
]

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { totalUnidades } = useCarrito()

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  return (
    <div className="navbar-fondo">
      <nav
        className="navbar navbar-expand-lg navbar-tienda"
        data-bs-theme="dark"
        aria-label="Navegación principal"
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand"
            onClick={cerrarMenu}
          >
            <img
              src="/img/logo/logo.png"
              alt="La Parada del Medio"
              className="navbar-logo"
            />
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            aria-controls="menu-tienda"
            aria-expanded={menuAbierto}
            aria-label="Abrir o cerrar menú"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            id="menu-tienda"
            className={`collapse navbar-collapse ${
              menuAbierto ? 'show' : ''
            }`}
          >
            <ul className="navbar-nav gap-3">
              {enlaces.map((enlace) => (
                <li className="nav-item" key={enlace.ruta}>
                  <Link
                    to={enlace.ruta}
                    className="nav-link enlace-navbar"
                    onClick={cerrarMenu}
                  >
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/carrito"
              className="navbar-carrito ms-lg-auto"
              onClick={cerrarMenu}
            >
              🛒 Carrito ({totalUnidades})
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar