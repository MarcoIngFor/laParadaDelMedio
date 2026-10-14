import { Link, Navigate, useNavigate } from 'react-router-dom'
import TarjetaAdmin from '../components/molecules/TarjetaAdmin'
import { obtenerCatalogo } from '../data/Catalogo'
import '../styles/Admin.css'

function leerDatos(clave, valorInicial) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? valorInicial
  } catch {
    return valorInicial
  }
}

function Admin() {
  const navigate = useNavigate()

  const usuarioActivo = localStorage.getItem('usuarioActivo')
  const usuarioSesion = leerDatos('usuarioSesion', null)

  const accesoPermitido =
    usuarioSesion &&
    usuarioSesion.tipoUsuario === usuarioActivo &&
    (usuarioActivo === 'admin' || usuarioActivo === 'vendedor')

  if (!accesoPermitido) {
    return <Navigate to="/login" replace />
  }

  const esAdministrador = usuarioActivo === 'admin'
  const usuariosGuardados = leerDatos('usuarios', [])
  const productosGuardados = obtenerCatalogo()

  const totalUsuarios = Array.isArray(usuariosGuardados)
    ? usuariosGuardados.length
    : 0

  const totalProductos = productosGuardados.length

  function cerrarSesion() {
    localStorage.removeItem('usuarioActivo')
    localStorage.removeItem('usuarioSesion')

    navigate('/login', { replace: true })
  }

  return (
    <>
      <section className="admin-bienvenida">
        <h1>Panel Administración</h1>

        <p>
          {esAdministrador
            ? 'Bienvenido Administrador'
            : 'Bienvenido Vendedor'}
        </p>

        <button
          type="button"
          className="admin-cerrar-sesion"
          onClick={cerrarSesion}
        >
          Cerrar Sesión
        </button>
      </section>

      <section className="admin-contenido">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <TarjetaAdmin
                titulo="📦 Productos"
                descripcion="Gestionar los productos disponibles en la tienda."
              >
                <Link to="/admin/productos" className="admin-boton">
                  Gestionar Productos
                </Link>
              </TarjetaAdmin>
            </div>

            {esAdministrador && (
              <div className="col-12 col-md-6">
                <TarjetaAdmin
                  titulo="👥 Usuarios"
                  descripcion="Gestionar los usuarios registrados en el sistema."
                >
                  <Link to="/admin/usuarios" className="admin-boton">
                    Gestionar Usuarios
                  </Link>
                </TarjetaAdmin>
              </div>
            )}

            <div className="col-12 col-md-6">
              <TarjetaAdmin
                titulo="🛒 Pedidos"
                descripcion="Revisar los pedidos realizados por los clientes."
              >
                <button
                  type="button"
                  className="admin-boton"
                  disabled
                >
                  Próximamente
                </button>
              </TarjetaAdmin>
            </div>

            {esAdministrador && (
              <div className="col-12 col-md-6">
                <TarjetaAdmin
                  titulo="📊 Resumen"
                  descripcion="Revisar información general del sistema."
                >
                  <p>Usuarios registrados: {totalUsuarios}</p>
                  <p>Productos disponibles: {totalProductos}</p>
                </TarjetaAdmin>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Admin