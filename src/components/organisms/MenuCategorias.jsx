import { Link, useSearchParams } from 'react-router-dom'
import { categorias } from '../../data/Categorias'
import '../../styles/MenuCategorias.css'

function MenuCategorias() {
  const [parametros] = useSearchParams()
  const categoriaActual = parametros.get('categoria') || ''

  return (
    <nav className="menu-categorias" aria-label="Categorías de productos">
      <Link
        to="/productos"
        className={`enlace-categoria ${
          categoriaActual === '' ? 'categoria-activa' : ''
        }`}
        aria-current={categoriaActual === '' ? 'page' : undefined}
      >
        Todos
      </Link>

      {categorias.map((categoria) => (
        <Link
          key={categoria.id}
          to={`/productos?categoria=${categoria.id}`}
          className={`enlace-categoria ${
            categoriaActual === categoria.id ? 'categoria-activa' : ''
          }`}
          aria-current={
            categoriaActual === categoria.id ? 'page' : undefined
          }
        >
          {categoria.nombre}
        </Link>
      ))}
    </nav>
  )
}

export default MenuCategorias