import { Link } from 'react-router-dom'
import '../../styles/Bienvenida.css'

function Bienvenida({
  titulo = 'Bienvenidos a La Parada del Medio',
  descripcion = 'Encuentra productos para tu hogar, alimentos, bebidas y mucho más.',
}) {
  return (
    <section className="bienvenida-tienda">
      <div className="container-fluid bienvenida-contenido">
        <h1 className="bienvenida-titulo">{titulo}</h1>

        <p className="bienvenida-descripcion">
          {descripcion}
        </p>

        <Link
          to="/login"
          className="bienvenida-login"
          aria-label="Iniciar sesión"
        >
          <img
            src="/img/logo/sesion.png"
            alt="Iniciar sesión"
          />
        </Link>
      </div>
    </section>
  )
}

export default Bienvenida