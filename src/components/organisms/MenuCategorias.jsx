import { categorias } from '../../data/Categorias'
import '../../styles/MenuCategorias.css'

function MenuCategorias() {
  return (
    <nav className="menu-categorias" aria-label="Categorías de productos">
      {categorias.map((categoria) => (
        <a
          key={categoria.id}
          href={`#${categoria.id}`}
          className="enlace-categoria"
        >
          {categoria.nombre}
        </a>
      ))}
    </nav>
  )
}

export default MenuCategorias