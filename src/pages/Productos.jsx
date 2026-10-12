import Bienvenida from '../components/organisms/Bienvenida'
import MenuCategorias from '../components/organisms/MenuCategorias'
import ListaProductos from '../components/organisms/ListaProductos'

function Productos() {
  return (
    <>
      <Bienvenida />
      <MenuCategorias />

      <section className="container-fluid px-4 py-5">
        <h1 className="text-danger mb-4">Nuestros productos</h1>
        <ListaProductos />
      </section>
    </>
  )
}

export default Productos