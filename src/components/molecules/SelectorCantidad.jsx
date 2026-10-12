import '../../styles/SelectorCantidad.css'

function SelectorCantidad({ cantidad, onCambiar, maximo = 20 }) {
  return (
    <div className="selector-cantidad">
      <button
        type="button"
        onClick={() => onCambiar(cantidad - 1)}
        disabled={cantidad <= 1}
        aria-label="Disminuir cantidad"
      >
        −
      </button>

      <span>{cantidad} un</span>

      <button
        type="button"
        onClick={() => onCambiar(cantidad + 1)}
        disabled={cantidad >= maximo}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  )
}

export default SelectorCantidad