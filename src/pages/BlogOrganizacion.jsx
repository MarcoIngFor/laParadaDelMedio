import ArticuloBlog from '../components/organisms/ArticuloBlog'

function BlogOrganizacion() {
  return (
    <ArticuloBlog
      imagen="/img/blog/organizacion.png"
      titulo="Consejos para organizar tu despensa"
    >
      <p>
        Mantener una despensa ordenada facilita encontrar los productos
        y permite saber qué alimentos necesitan reponerse.
      </p>

      <p>
        Una buena opción es separar los productos por categorías,
        por ejemplo abarrotes, snacks, bebidas y productos de limpieza.
      </p>

      <p>
        También es recomendable colocar adelante los productos que
        tienen una fecha de vencimiento más cercana. De esta forma
        pueden consumirse primero y reducir el desperdicio.
      </p>

      <p>
        Una despensa organizada ayuda a planificar mejor las compras
        y permite aprovechar mejor los productos que ya tenemos
        en nuestro hogar.
      </p>
    </ArticuloBlog>
  )
}

export default BlogOrganizacion