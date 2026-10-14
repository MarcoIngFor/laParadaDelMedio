import { obtenerCatalogo, guardarCatalogo } from './Catalogo'

export function obtenerPedidos() {
  const guardados = localStorage.getItem('pedidos')

  if (guardados === null) {
    return []
  }

  const pedidos = JSON.parse(guardados)

  if (!Array.isArray(pedidos)) {
    throw new Error('Los pedidos guardados no tienen un formato válido.')
  }

  return pedidos
}

export function realizarCompra(items, cliente, resultadoPago) {
  if (!items.length) {
    return {
      correcto: false,
      mensaje: 'El carrito está vacío.',
    }
  }

  if (resultadoPago !== 'aprobado') {
    return {
      correcto: false,
      mensaje: 'El pago simulado fue rechazado. Puedes intentarlo nuevamente.',
    }
  }

  try {
    const catalogo = obtenerCatalogo()
    const detalles = []

    for (const item of items) {
      const producto = catalogo.find(
        (producto) => producto.codigo === item.codigo
      )

      if (!producto) {
        return {
          correcto: false,
          mensaje: `El producto ${item.nombre} ya no está disponible.`,
        }
      }

      if (
        !Number.isInteger(item.cantidad) ||
        item.cantidad < 1 ||
        item.cantidad > Number(producto.stock)
      ) {
        return {
          correcto: false,
          mensaje: `Revisa la cantidad de ${producto.nombre}. Stock disponible: ${producto.stock}.`,
        }
      }

      const precio = Number(producto.precio)

      if (!Number.isFinite(precio) || precio < 0) {
        return {
          correcto: false,
          mensaje: `El precio de ${producto.nombre} no es válido.`,
        }
      }

      detalles.push({
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio,
        cantidad: item.cantidad,
        subtotal: precio * item.cantidad,
      })
    }

    const pedido = {
      codigo: crypto.randomUUID(),
      fecha: new Date().toISOString(),
      cliente: { ...cliente },
      productos: detalles,
      total: detalles.reduce((suma, item) => suma + item.subtotal, 0),
      estado: 'pendiente',
      pago: 'aprobado',
    }

    const nuevosProductos = catalogo.map((producto) => {
      const comprado = detalles.find(
        (item) => item.codigo === producto.codigo
      )

      return comprado
        ? {
            ...producto,
            stock: Number(producto.stock) - comprado.cantidad,
          }
        : producto
    })

    const nuevosPedidos = [...obtenerPedidos(), pedido]

    // Respaldamos los datos para restaurarlos si falla el guardado.
    const claves = ['productos', 'pedidos', 'carrito']
    const respaldo = Object.fromEntries(
      claves.map((clave) => [clave, localStorage.getItem(clave)])
    )

    try {
      guardarCatalogo(nuevosProductos)
      localStorage.setItem('pedidos', JSON.stringify(nuevosPedidos))
      localStorage.setItem('carrito', JSON.stringify([]))
    } catch {
      for (const clave of claves) {
        if (respaldo[clave] === null) {
          localStorage.removeItem(clave)
        } else {
          localStorage.setItem(clave, respaldo[clave])
        }
      }

      return {
        correcto: false,
        mensaje: 'No se pudo guardar la compra. Intenta nuevamente.',
      }
    }

    return { correcto: true, pedido }
  } catch {
    return {
      correcto: false,
      mensaje: 'No se pudo completar la compra. Revisa el carrito.',
    }
  }
}