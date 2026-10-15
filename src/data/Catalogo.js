import { productos } from './Productos.js'

function normalizarImagen(imagen) {
  const ruta = typeof imagen === 'string' ? imagen.trim() : ''

  if (ruta.startsWith('img/')) {
    return `/${ruta}`
  }

  if (ruta.startsWith('./img/')) {
    return ruta.slice(1)
  }

  return ruta
}

function prepararProducto(item) {
  const {
    precioOriginal,
    enOferta,
    ...producto
  } = item

  return {
    ...producto,
    precio: Number(precioOriginal ?? producto.precio),
    imagen: normalizarImagen(producto.imagen),
  }
}

export function obtenerCatalogo({ aplicarOfertas = true } = {}) {
  let catalogo = productos

  try {
    const guardados = JSON.parse(localStorage.getItem('productos'))

    if (Array.isArray(guardados)) {
      catalogo = guardados
    }
  } catch {
    // Usamos el catálogo inicial si no se pueden leer los datos.
  }

  return catalogo.map((item) => {
    const producto = prepararProducto(item)

    const tieneOferta =
      producto.precioOferta !== null &&
      producto.precioOferta !== undefined &&
      producto.precioOferta !== '' &&
      Number.isFinite(Number(producto.precioOferta)) &&
      Number(producto.precioOferta) >= 0 &&
      Number(producto.precioOferta) < producto.precio

    if (aplicarOfertas && tieneOferta) {
      return {
        ...producto,
        precioOriginal: producto.precio,
        precio: Number(producto.precioOferta),
        enOferta: true,
      }
    }

    return producto
  })
}

export function guardarCatalogo(catalogo) {
  localStorage.setItem(
    'productos',
    JSON.stringify(catalogo.map(prepararProducto))
  )
}