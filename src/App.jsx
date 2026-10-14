import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'

import LayoutTienda from './components/layout/LayoutTienda'

import Inicio from './pages/Inicio'
import Productos from './pages/Productos'
import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'
import BlogAhorro from './pages/BlogAhorro'
import BlogOrganizacion from './pages/BlogOrganizacion'
import Contacto from './pages/Contacto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Admin from './pages/Admin'
import AdminProductos from './pages/AdminProductos'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminPedidos from './pages/AdminPedidos'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraFallida from './pages/CompraFallida'

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <LayoutTienda>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />

            <Route
              path="/productos/:codigo"
              element={<DetalleProducto />}
            />

            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/ahorro" element={<BlogAhorro />} />

            <Route
              path="/blog/organizacion"
              element={<BlogOrganizacion />}
            />

            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/compra-exitosa/:codigo"
              element={<CompraExitosa />}
            />

            <Route path="/compra-fallida" element={<CompraFallida />} />
            <Route path="/admin" element={<Admin />} />

            <Route
              path="/admin/productos"
              element={<AdminProductos />}
            />

            <Route
              path="/admin/usuarios"
              element={<AdminUsuarios />}
            />

            <Route
              path="/admin/pedidos"
              element={<AdminPedidos />}
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
      </CarritoProvider>
    </BrowserRouter>
  )
}

export default App