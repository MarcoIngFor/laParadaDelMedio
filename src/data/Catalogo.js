import { productos } from './Productos'

export function obtenerCatalogo() {
  try {
    const guardados = JSON.parse(localStorage.getItem('productos'))

    if (Array.isArray(guardados)) {
      return guardados
    }
  } catch {
    // Si no se pueden leer los datos, usamos el catálogo inicial.
  }

  return productos.map((producto) => ({ ...producto }))
}

export function guardarCatalogo(catalogo) {
  localStorage.setItem('productos', JSON.stringify(catalogo))
}