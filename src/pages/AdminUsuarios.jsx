import { Link, Navigate } from 'react-router-dom'
import GestorUsuarios from '../components/organisms/GestorUsuarios'
import '../styles/AdminProductos.css'

function AdminUsuarios() {
  const rol = localStorage.getItem('usuarioActivo')

  let sesion = null

  try {
    sesion = JSON.parse(localStorage.getItem('usuarioSesion'))
  } catch {
    sesion = null
  }

  if (!sesion || sesion.tipoUsuario !== rol) {
    return <Navigate to="/login" replace />
  }

  if (rol !== 'admin') {
    return (
      <section className="gestion-productos">
        <div className="container">
          <h1>Acceso no autorizado</h1>
          <p>La gestión de usuarios está disponible solo para administradores.</p>

          <Link
            to={rol === 'vendedor' ? '/admin' : '/'}
            className="gestion-boton"
          >
            Volver
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="gestion-productos">
      <div className="container">
        <div className="gestion-encabezado">
          <h1>Gestión de Usuarios</h1>

          <Link to="/admin" className="gestion-boton">
            Volver al panel
          </Link>
        </div>

        <GestorUsuarios sesion={sesion} />
      </div>
    </section>
  )
}

export default AdminUsuarios