import { useState, useEffect } from 'react'
import '../../styles/SliderOfertas.css'

const ofertas = [
  '/img/ofertas/Sllide1.png',
  '/img/ofertas/Sllide2.png',
  '/img/ofertas/Sllide3.png',
]

function SliderOfertas() {
  const [indice, setIndice] = useState(0)
    useEffect(() => {
        const temporizador = setInterval(() => {
            setIndice((actual) => (actual + 1) % ofertas.length)
        }, 5000)

        return () => clearInterval(temporizador)
    }, [])

  function siguiente() {
    setIndice((actual) => (actual + 1) % ofertas.length)
  }

  function anterior() {
    setIndice((actual) =>
      (actual - 1 + ofertas.length) % ofertas.length
    )
  }

  return (
    <section className="slider-ofertas" aria-label="Ofertas de la semana">
      <div className="slider-contenido">
        <img
          src={ofertas[indice]}
          alt={`Ofertas de la semana, imagen ${indice + 1}`}
          className="slider-imagen"
        />

        <button
          type="button"
          className="slider-control slider-anterior"
          onClick={anterior}
          aria-label="Oferta anterior"
        >
          ❮
        </button>

        <button
          type="button"
          className="slider-control slider-siguiente"
          onClick={siguiente}
          aria-label="Oferta siguiente"
        >
          ❯
        </button>
      </div>
    </section>
  )
}

export default SliderOfertas