import Boton from '../atoms/Boton'
import '../../styles/TarjetaProducto.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import SelectorCantidad from './SelectorCantidad'

function TarjetaProducto({ codigo, nombre, precio, imagen }) {
  function agregarProducto() {
    alert(`Agregaste ${nombre}`)
  }

const [cantidad, setCantidad] = useState(1)

  return (
    <article className="card h-100 tarjeta-producto">
        <Link to={`/productos/${codigo}`}>
        <img
            src={imagen}
            alt={nombre}
            className="producto-imagen"
        />
        </Link>

        <div className="card-body">
            <h2 className="card-title h5">{nombre}</h2>

            <p className="producto-precio">
            ${precio.toLocaleString('es-CL')}
            </p>

            <SelectorCantidad
                cantidad={cantidad}
                onCambiar={setCantidad}
            />

            <Boton
                texto="Agregar al carrito"
                onClick={agregarProducto}
            />
        </div>
    </article>
  )
}

export default TarjetaProducto