import Bienvenida from '../components/organisms/Bienvenida'
import '../styles/Nosotros.css'

function Nosotros() {
  return (
    <>
      <Bienvenida
        titulo="Sobre Nosotros"
        descripcion="Conoce el proyecto detrás de La Parada del Medio."
      />

      <section className="nosotros-contenido">
        <video
          className="nosotros-video"
          controls
          preload="metadata"
          aria-label="Presentación del proyecto La Parada del Medio"
        >
          <source
            src="/video/presentacion.mp4"
            type="video/mp4"
          />
          Tu navegador no admite la reproducción de este video.
        </video>
      </section>
    </>
  )
}

export default Nosotros