/* global describe, it, expect, beforeEach, afterEach, spyOn, jasmine */

import {
  cleanup,
  fireEvent,
  render,
  screen
} from '@testing-library/react'

import SelectorCantidad from '../components/molecules/SelectorCantidad'
import FormularioContacto from '../components/organisms/FormularioContacto'

import {
  obtenerCatalogo,
  guardarCatalogo
} from '../data/Catalogo'

import { realizarCompra } from '../data/Pedidos'

describe('La Parada del Medio: pruebas del frontend', () => {
  let almacenamiento

  const productoBase = {
    codigo: 'PRUEBA001',
    nombre: 'Arroz de prueba',
    descripcion: 'Producto utilizado en las pruebas',
    precio: 1690,
    stock: 20,
    stockCritico: 5,
    categoria: 'abarrotes',
    imagen: 'img/Productos/Abarrotes/arroz.png'
  }

  const clienteBase = {
    nombre: 'Cliente',
    apellido: 'Prueba',
    correo: 'cliente@gmail.com',
    telefono: '123456789',
    entrega: 'retiro',
    region: 'metropolitana',
    comuna: 'Cerrillos',
    direccion: 'Dirección de prueba'
  }

  function guardarProductos(productos) {
    localStorage.setItem(
      'productos',
      JSON.stringify(productos)
    )
  }

  function completarCampo(etiqueta, valor) {
    fireEvent.change(
      screen.getByLabelText(etiqueta),
      {
        target: {
          value: valor
        }
      }
    )
  }

  beforeEach(() => {
    almacenamiento = new Map()

    // Simulamos localStorage para aislar cada prueba.
    spyOn(Storage.prototype, 'getItem').and.callFake(
      (clave) => almacenamiento.get(String(clave)) ?? null
    )

    spyOn(Storage.prototype, 'setItem').and.callFake(
      (clave, valor) => {
        almacenamiento.set(
          String(clave),
          String(valor)
        )
      }
    )

    spyOn(Storage.prototype, 'removeItem').and.callFake(
      (clave) => {
        almacenamiento.delete(String(clave))
      }
    )

    guardarProductos([{ ...productoBase }])
  })

  afterEach(() => {
    cleanup()
  })

  it('1. Impide disminuir la cantidad por debajo de una unidad', () => {
    const cambiarCantidad = jasmine.createSpy('cambiarCantidad')

    render(
      <SelectorCantidad
        cantidad={1}
        maximo={5}
        onCambiar={cambiarCantidad}
      />
    )

    const botonDisminuir = screen.getByRole(
      'button',
      {
        name: 'Disminuir cantidad'
      }
    )

    expect(botonDisminuir.disabled).toBeTrue()

    fireEvent.click(botonDisminuir)

    expect(cambiarCantidad).not.toHaveBeenCalled()
  })

  it('2. Solicita aumentar la cantidad y respeta el máximo disponible', () => {
    const cambiarCantidad = jasmine.createSpy('cambiarCantidad')

    const { rerender } = render(
      <SelectorCantidad
        cantidad={1}
        maximo={2}
        onCambiar={cambiarCantidad}
      />
    )

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Aumentar cantidad'
      })
    )

    expect(cambiarCantidad).toHaveBeenCalledWith(2)

    rerender(
      <SelectorCantidad
        cantidad={2}
        maximo={2}
        onCambiar={cambiarCantidad}
      />
    )

    expect(
      screen.getByRole('button', {
        name: 'Aumentar cantidad'
      }).disabled
    ).toBeTrue()
  })

  it('3. Actualiza el nombre cuando el usuario escribe en el formulario', () => {
    render(<FormularioContacto />)

    completarCampo(/Nombres/i, 'Marco')

    expect(
      screen.getByLabelText(/Nombres/i).value
    ).toBe('Marco')
  })

  it('4. Muestra los errores al enviar el formulario vacío', () => {
    render(<FormularioContacto />)

    fireEvent.click(
      screen.getByRole('button', {
        name: /Enviar Mensaje/i
      })
    )

    expect(
      screen.getByText('El nombre es obligatorio')
    ).toBeTruthy()

    expect(
      screen.getByText('El apellido es obligatorio')
    ).toBeTruthy()

    expect(
      screen.getByText('El correo es obligatorio')
    ).toBeTruthy()

    expect(
      screen.getByText('El teléfono es obligatorio')
    ).toBeTruthy()

    expect(
      screen.getByText('El mensaje es obligatorio')
    ).toBeTruthy()
  })

  it('5. Valida un formulario correcto y limpia sus campos', () => {
    render(<FormularioContacto />)

    completarCampo(/Nombres/i, 'Marco')
    completarCampo(/Apellidos/i, 'Prueba')
    completarCampo(/Correo/i, 'marco@gmail.com')
    completarCampo(/Teléfono/i, '123456789')
    completarCampo(/^Mensaje:/i, 'Consulta sobre los productos.')

    fireEvent.click(
      screen.getByRole('button', {
        name: /Enviar Mensaje/i
      })
    )

    expect(
      screen.getByRole('status').textContent
    ).toMatch(/simulaci[oó]n/i)

    expect(
      screen.getByLabelText(/Nombres/i).value
    ).toBe('')

    expect(
      screen.getByLabelText(/^Mensaje:/i).value
    ).toBe('')

    expect(
      screen.queryByText('El nombre es obligatorio')
    ).toBeNull()
  })

  it('6. Corrige una ruta de imagen que comienza con img/', () => {
    const catalogo = obtenerCatalogo()

    expect(catalogo[0].imagen).toBe(
      '/img/Productos/Abarrotes/arroz.png'
    )
  })

  it('7. Aplica una oferta válida al precio del catálogo', () => {
    guardarProductos([
      {
        ...productoBase,
        precioOferta: 1400
      }
    ])

    const producto = obtenerCatalogo()[0]

    expect(producto.precio).toBe(1400)
    expect(producto.precioOriginal).toBe(1690)
    expect(producto.enOferta).toBeTrue()
  })

  it('8. Conserva el precio normal al guardar un producto con oferta', () => {
    guardarProductos([
      {
        ...productoBase,
        precioOferta: 1400
      }
    ])

    const catalogoConOfertas = obtenerCatalogo()

    guardarCatalogo(catalogoConOfertas)

    const productosGuardados = JSON.parse(
      localStorage.getItem('productos')
    )

    expect(productosGuardados[0].precio).toBe(1690)
    expect(productosGuardados[0].precioOferta).toBe(1400)

    expect(
      obtenerCatalogo({
        aplicarOfertas: false
      })[0].precio
    ).toBe(1690)
  })

  it('9. Conserva el stock y el carrito cuando el pago es rechazado', () => {
    const items = [
      {
        codigo: productoBase.codigo,
        nombre: productoBase.nombre,
        cantidad: 2
      }
    ]

    localStorage.setItem(
      'carrito',
      JSON.stringify(items)
    )

    const productosAntes = localStorage.getItem('productos')
    const carritoAntes = localStorage.getItem('carrito')

    const resultado = realizarCompra(
      items,
      clienteBase,
      'rechazado'
    )

    expect(resultado.correcto).toBeFalse()

    expect(
      localStorage.getItem('productos')
    ).toBe(productosAntes)

    expect(
      localStorage.getItem('carrito')
    ).toBe(carritoAntes)

    expect(
      localStorage.getItem('pedidos')
    ).toBeNull()
  })

  it('10. Registra una compra aprobada con oferta y descuenta el stock', () => {
    guardarProductos([
      {
        ...productoBase,
        precioOferta: 1400
      }
    ])

    const items = [
      {
        codigo: productoBase.codigo,
        nombre: productoBase.nombre,
        cantidad: 2
      }
    ]

    localStorage.setItem(
      'carrito',
      JSON.stringify(items)
    )

    const resultado = realizarCompra(
      items,
      clienteBase,
      'aprobado'
    )

    expect(resultado.correcto).toBeTrue()

    const pedidos = JSON.parse(
      localStorage.getItem('pedidos')
    )

    const productos = JSON.parse(
      localStorage.getItem('productos')
    )

    const carrito = JSON.parse(
      localStorage.getItem('carrito')
    )

    expect(pedidos.length).toBe(1)
    expect(pedidos[0].total).toBe(2800)
    expect(pedidos[0].estado).toBe('pendiente')
    expect(pedidos[0].productos[0].cantidad).toBe(2)
    expect(pedidos[0].productos[0].precio).toBe(1400)

    expect(productos[0].stock).toBe(18)
    expect(productos[0].precio).toBe(1690)

    expect(carrito).toEqual([])
  })
})