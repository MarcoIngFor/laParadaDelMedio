import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Navbar.css'

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  function cerrarMenu() {
    setMenuAbierto(false)
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-tienda"
      data-bs-theme="dark"
      aria-label="Navegación principal"
    >
      <div className="container-fluid">
        <Link to="/" className="marca-nav" onClick={cerrarMenu}>
          <img
            src="/img/logo/logo.png"
            alt="La Parada del Medio"
            className="imagen-nav"
          />
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-controls="menu-tienda"
          aria-expanded={menuAbierto}
          aria-label="Abrir o cerrar menú"
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
            <li>
              <Link to="/" className="enlace-nav" onClick={cerrarMenu}>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/productos"
                className="enlace-nav"
                onClick={cerrarMenu}
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                to="/nosotros"
                className="enlace-nav"
                onClick={cerrarMenu}
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/blog" className="enlace-nav" onClick={cerrarMenu}>
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className="enlace-nav"
                onClick={cerrarMenu}
              >
                Contacto
              </Link>
            </li>
          </ul>

          <Link
            to="/carrito"
            className="carrito-nav ms-lg-auto"
            onClick={cerrarMenu}
          >
            🛒 Carrito (0)
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar