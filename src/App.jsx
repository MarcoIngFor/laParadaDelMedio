import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LayoutTienda from './components/layout/LayoutTienda'
import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'

function App() {
  return (
    <BrowserRouter>
      <LayoutTienda>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:codigo" element={<DetalleProducto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blogs />} 
        />

          <Route
            path="*"
            element={
              <section className="container py-5">
                <h1>Página no encontrada</h1>
                <p>Esta página todavía no está disponible.</p>
              </section>
            }
          />
        </Routes>
      </LayoutTienda>
    </BrowserRouter>
  )
}

export default App