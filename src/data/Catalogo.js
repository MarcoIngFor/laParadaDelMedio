import { productos } from './Productos'

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

function normalizarCatalogo(catalogo) {
  return catalogo.map((producto) => ({
    ...producto,
    imagen: normalizarImagen(producto.imagen),
  }))
}

export function obtenerCatalogo() {
  try {
    const guardados = JSON.parse(localStorage.getItem('productos'))

    if (Array.isArray(guardados)) {
      return normalizarCatalogo(guardados)
    }
  } catch {
    // Si no se pueden leer los datos, usamos el catálogo inicial.
  }

  return normalizarCatalogo(productos)
}

export function guardarCatalogo(catalogo) {
  localStorage.setItem(
    'productos',
    JSON.stringify(normalizarCatalogo(catalogo))
  )
}