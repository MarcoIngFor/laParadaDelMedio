import { Link, useLocation } from 'react-router-dom'
import '../styles/Checkout.css'

function CompraFallida() {
  const location = useLocation()

  return (
    <section className="checkout-pagina">
      <div className="container checkout-tarjeta">
        <h1>No se pudo completar la compra</h1>

        <p role="alert">
          {location.state?.mensaje ||
            'La compra simulada no pudo completarse.'}
        </p>

        <p>Revisa el carrito antes de intentarlo nuevamente.</p>

        <div className="checkout-acciones">
          <Link to="/checkout" className="checkout-boton">
            Intentar nuevamente
          </Link>

          <Link to="/carrito" className="checkout-boton checkout-secundario">
            Volver al carrito
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CompraFallida