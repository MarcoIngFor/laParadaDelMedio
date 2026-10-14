import { createContext, useContext, useState } from 'react'
import { obtenerCatalogo } from '../data/Catalogo'
import { realizarCompra } from '../data/Pedidos'

const CarritoContext = createContext(null)

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem('carrito'))

    if (!Array.isArray(guardado)) {
      return []
    }

    const catalogo = obtenerCatalogo()
    const resultado = []

    guardado.forEach((item) => {
      const producto = item.codigo
        ? catalogo.find((producto) => producto.codigo === item.codigo)
        : catalogo.find((producto) => producto.nombre === item.nombre)

      const codigo = producto?.codigo || item.codigo
      const cantidad = Number(item.cantidad)

      if (!codigo || !Number.isInteger(cantidad) || cantidad < 1) {
        return
      }

      const existente = resultado.find((item) => item.codigo === codigo)

      if (existente) {
        existente.cantidad += cantidad
      } else {
        resultado.push({
          codigo,
          nombre: producto?.nombre || item.nombre || codigo,
          cantidad,
        })
      }
    })

    return resultado
  } catch {
    return []
  }
}

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(cargarCarrito)
  const [errorCarrito, setErrorCarrito] = useState('')

  const catalogo = obtenerCatalogo()

  const carrito = items.map((item) => {
    const producto = catalogo.find(
      (producto) => producto.codigo === item.codigo
    )

    return {
      ...item,
      nombre: producto?.nombre || item.nombre,
      precio: producto ? Number(producto.precio) : 0,
      imagen: producto?.imagen || '',
      stock: producto ? Number(producto.stock) : 0,
      disponible: Boolean(producto),
    }
  })

  const totalUnidades = items.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  const totalPrecio = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  )

  function guardar(nuevosItems) {
    try {
      localStorage.setItem('carrito', JSON.stringify(nuevosItems))
      setItems(nuevosItems)
      setErrorCarrito('')
      return true
    } catch {
      setErrorCarrito('No se pudo guardar el carrito en este navegador.')
      return false
    }
  }

  function agregarProducto(codigo, cantidad) {
    const producto = obtenerCatalogo().find(
      (producto) => producto.codigo === codigo
    )

    if (!producto) {
      return {
        correcto: false,
        mensaje: 'El producto ya no está disponible.',
      }
    }

    if (!Number.isInteger(cantidad) || cantidad < 1) {
      return {
        correcto: false,
        mensaje: 'Seleccione una cantidad válida.',
      }
    }

    const existente = items.find((item) => item.codigo === codigo)
    const nuevaCantidad = (existente?.cantidad || 0) + cantidad

    if (nuevaCantidad > Number(producto.stock)) {
      return {
        correcto: false,
        mensaje: `Stock disponible: ${producto.stock}. Ya tienes ${
          existente?.cantidad || 0
        } unidades en el carrito.`,
      }
    }

    const nuevosItems = existente
      ? items.map((item) =>
          item.codigo === codigo
            ? { ...item, cantidad: nuevaCantidad }
            : item
        )
      : [...items, { codigo, nombre: producto.nombre, cantidad }]

    const correcto = guardar(nuevosItems)

    return {
      correcto,
      mensaje: correcto
        ? 'Producto agregado al carrito.'
        : 'No se pudo guardar el carrito.',
    }
  }

  function cambiarCantidad(codigo, cantidad) {
    const producto = obtenerCatalogo().find(
      (producto) => producto.codigo === codigo
    )

    if (
      !producto ||
      !Number.isInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > Number(producto.stock)
    ) {
      setErrorCarrito('La cantidad solicitada supera el stock disponible.')
      return
    }

    guardar(
      items.map((item) =>
        item.codigo === codigo ? { ...item, cantidad } : item
      )
    )
  }

  function eliminarProducto(codigo) {
    guardar(items.filter((item) => item.codigo !== codigo))
  }

  function vaciarCarrito() {
    guardar([])
  }

  function confirmarCompra(cliente, resultadoPago) {
    const resultado = realizarCompra(items, cliente, resultadoPago)

    if (resultado.correcto) {
      setItems([])
      setErrorCarrito('')
    }

    return resultado
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        totalUnidades,
        totalPrecio,
        errorCarrito,
        agregarProducto,
        cambiarCantidad,
        eliminarProducto,
        vaciarCarrito,
        confirmarCompra,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error('useCarrito debe utilizarse dentro de CarritoProvider.')
  }

  return contexto
}