import { useSearchParams } from 'react-router-dom'
import { obtenerCatalogo } from '../../data/Catalogo'
import { categorias } from '../../data/Categorias'
import TarjetaProducto from '../molecules/TarjetaProducto'

function ListaProductos() {
  const productos = obtenerCatalogo()
  
  const [parametros] = useSearchParams()
  const categoriaActual = parametros.get('categoria') || ''

  const categoriasVisibles = categoriaActual
    ? categorias.filter((categoria) => categoria.id === categoriaActual)
    : categorias

  if (categoriasVisibles.length === 0) {
    return (
      <p className="text-center">
        La categoría seleccionada no existe.
      </p>
    )
  }

  return (
    <>
      {categoriasVisibles.map((categoria) => {
        const productosCategoria = productos.filter(
          (producto) => producto.categoria === categoria.id
        )

        return (
          <section
            key={categoria.id}
            id={categoria.id}
            className="seccion-productos"
          >
            <h2 className="titulo-categoria">
              {categoria.nombre}
            </h2>

            {productosCategoria.length === 0 ? (
              <p className="text-center">
                No hay productos disponibles en esta categoría.
              </p>
            ) : (
              <div className="row g-4">
                {productosCategoria.map((producto) => (
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
            )}
          </section>
        )
      })}
    </>
  )
}

export default ListaProductos