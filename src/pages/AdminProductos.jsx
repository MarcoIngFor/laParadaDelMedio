import { Link, Navigate } from 'react-router-dom'
import GestorProductos from '../components/organisms/GestorProductos'
import '../styles/AdminProductos.css'

function AdminProductos() {
  const rol = localStorage.getItem('usuarioActivo')

  let sesion = null

  try {
    sesion = JSON.parse(localStorage.getItem('usuarioSesion'))
  } catch {
    sesion = null
  }

  const accesoPermitido =
    sesion &&
    sesion.tipoUsuario === rol &&
    (rol === 'admin' || rol === 'vendedor')

  if (!accesoPermitido) {
    return <Navigate to="/login" replace />
  }

  return (
    <section className="gestion-productos">
      <div className="container">
        <div className="gestion-encabezado">
          <h1>Gestión de Productos</h1>

          <Link to="/admin" className="gestion-boton">
            Volver al panel
          </Link>
        </div>

        <GestorProductos esAdministrador={rol === 'admin'} />
      </div>
    </section>
  )
}

export default AdminProductos