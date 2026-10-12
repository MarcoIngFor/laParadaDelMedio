import { productos } from '../../data/Productos'
import { categorias } from '../../data/Categorias'
import TarjetaProducto from '../molecules/TarjetaProducto'

function ListaProductos() {
  return (
    <>
      {categorias.map((categoria) => (
        <section
          key={categoria.id}
          id={categoria.id}
          className="seccion-productos"
        >
          <h2 className="titulo-categoria">{categoria.nombre}</h2>

          <div className="row g-4">
            {productos
              .filter((producto) => producto.categoria === categoria.id)
              .map((producto) => (
                <div
                  key={producto.codigo}
                  className="col-12 col-sm-6 col-md-4 col-xl-2"
                >
                  <TarjetaProducto
                    codigo={producto.codigo}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    imagen={producto.imagen}
                  />
                </div>
              ))}
          </div>
        </section>
      ))}
    </>
  )
}

export default ListaProductos