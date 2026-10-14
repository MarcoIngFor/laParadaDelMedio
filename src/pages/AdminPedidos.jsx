import { Link, Navigate } from 'react-router-dom'
import ListaPedidos from '../components/organisms/ListaPedidos'
import '../styles/AdminProductos.css'

function AdminPedidos() {
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
          <h1>Gestión de Pedidos</h1>

          <Link to="/admin" className="gestion-boton">
            Volver al panel
          </Link>
        </div>

        <p className="alert alert-info">
          Estos pedidos corresponden a compras simuladas.
          No se realizaron cobros reales.
        </p>

        <ListaPedidos />
      </div>
    </section>
  )
}

export default AdminPedidos