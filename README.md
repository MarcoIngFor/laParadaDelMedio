# La Parada del Medio

Proyecto académico desarrollado para la asignatura Desarrollo Full Stack II de Duoc UC.

La aplicación representa una tienda de almacén de barrio y permite consultar productos, utilizar un carrito y realizar compras simuladas. También incorpora un panel para administrar productos, usuarios y consultar pedidos.

El proyecto corresponde a la migración de una página HTML, CSS y JavaScript a React, utilizando Bootstrap y una organización de componentes basada en Atomic Design.

## Tecnologías utilizadas

- React.
- Vite.
- React Router.
- Bootstrap.
- JavaScript.
- CSS.
- Jasmine y Karma.
- React Testing Library.
- Istanbul y karma-coverage.

## Funcionalidades

- Catálogo de productos filtrado por categoría.
- Visualización del detalle de cada producto.
- Ofertas con precio normal y precio rebajado.
- Slider de ofertas con controles y cambio automático.
- Carrito con selección de cantidades y cálculo del total.
- Registro e inicio de sesión de demostración.
- Formulario de contacto con validaciones.
- Blog con artículos sobre ahorro y organización de la despensa.
- Compra simulada con resultado aprobado o rechazado.
- Registro de pedidos y descuento de stock al aprobar una compra.
- Panel administrativo con opciones según el rol.
- Creación, consulta, edición y eliminación de productos.
- Gestión de usuarios para el administrador.
- Consulta del listado y detalle de pedidos.
- Diseño adaptable a diferentes tamaños de pantalla.

## Roles de usuario

| Rol | Acceso |
|---|---|
| Administrador | Gestión de productos, gestión de usuarios, consulta de pedidos y resumen del panel. |
| Vendedor | Gestión de productos y consulta de pedidos. |
| Cliente | Acceso a la tienda y al proceso de compra simulada. |

El registro público crea cuentas con el rol de cliente.

## Organización del proyecto

Los componentes se organizan siguiendo Atomic Design:

- `src/components/atoms`: elementos básicos.
- `src/components/molecules`: agrupaciones de elementos, como tarjetas y selectores.
- `src/components/organisms`: componentes con mayor funcionalidad, como formularios y gestores.
- `src/components/layout`: estructura compartida de las páginas.
- `src/pages`: páginas asociadas a las rutas.
- `src/context`: estado compartido del carrito.
- `src/data`: datos y funciones para trabajar con productos, usuarios y pedidos.
- `src/styles`: estilos de la aplicación.
- `src/tests`: pruebas automatizadas.
- `public/img`: imágenes utilizadas en la tienda.

## Requisitos

- Node.js y npm compatibles con la versión de Vite indicada en `package.json`.
- Google Chrome instalado para ejecutar las pruebas con Karma.

## Instalación

Descargar o clonar este repositorio y abrir una terminal dentro de la carpeta que contiene `package.json`.

Instalar las dependencias:

```bash
npm ci
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección indicada por la terminal.

## Generar la versión de producción

```bash
npm run build
```

Los archivos generados se guardan en la carpeta `dist`.

Para revisar esa versión localmente:

```bash
npm run preview
```

Abrir la dirección indicada por la terminal. La versión compilada se debe consultar mediante el servidor de vista previa.

## Cuentas de demostración

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@gmail.com | admin123 |
| Vendedor | vendedor@gmail.com | vende123 |
| Cliente | cliente@gmail.com | cliente1 |

Estas cuentas se inicializan cuando no existe un registro de usuarios en el almacenamiento local de ese origen. Si se modifican desde la aplicación, sus datos pueden diferir de los indicados en esta tabla.

Las cuentas y contraseñas son exclusivamente de demostración.

## Almacenamiento y simulaciones

La aplicación funciona como un frontend académico y utiliza `localStorage` para conservar productos, usuarios, sesión, carrito y pedidos.

Los datos quedan almacenados en el navegador y origen donde se utiliza la aplicación. No se sincronizan entre equipos o navegadores, y pueden eliminarse al borrar los datos del sitio.

La versión de desarrollo y la vista previa pueden utilizar puertos diferentes, por lo que sus datos almacenados pueden ser distintos.

- No existe conexión con un backend o base de datos.
- El inicio de sesión y los permisos por rol se simulan en el frontend; no constituyen un sistema de autenticación seguro para producción.
- Los pagos son simulados y no realizan cobros.
- El formulario de contacto valida los datos, pero no envía correos.
- Las rutas o URL de imágenes referencian archivos existentes; ingresarlas no sube imágenes a un servidor.

## Pruebas automatizadas

Para ejecutar las pruebas:

```bash
npm test
```

Se utiliza Jasmine para definir los casos, Karma para ejecutarlos en Chrome Headless y React Testing Library para interactuar con los componentes.

El conjunto incluye diez casos:

1. Bloqueo de la disminución por debajo de una unidad.
2. Aumento de cantidad y bloqueo al alcanzar el máximo.
3. Actualización del nombre en el formulario de contacto.
4. Mensajes obligatorios al enviar el formulario vacío.
5. Validación de un formulario correcto y limpieza de campos.
6. Normalización de rutas de imágenes.
7. Aplicación de una oferta válida.
8. Conservación del precio normal al guardar un producto con oferta.
9. Conservación del stock y carrito ante un pago rechazado.
10. Registro de una compra aprobada, cálculo con oferta, descuento de stock y vaciado del carrito.

Las pruebas utilizan un almacenamiento simulado en memoria para mantener los casos independientes.

### Resultados registrados

En la ejecución documentada del 15 de octubre de 2026:

- Pruebas aprobadas: 10 de 10.
- Cobertura de instrucciones: 83,07 %.
- Cobertura de ramas: 75 %.
- Cobertura de funciones: 96,15 %.
- Cobertura de líneas: 82,81 %.

Los porcentajes corresponden a los archivos cargados por este conjunto de pruebas, no a toda la aplicación. Pueden cambiar al modificar el código o ampliar los casos.

El informe de cobertura se genera en:

```text
coverage/html/index.html
```

## Validaciones complementarias

- Compilación de producción realizada correctamente con `npm run build`.
- Revisión manual en el modo de emulación móvil de Chrome DevTools.
- Revisión visual del slider de ofertas en la vista previa de producción.

Estas comprobaciones complementan las pruebas automatizadas y no equivalen a verificar todos los dispositivos y navegadores.

## Autor

Marco Antonio Castro Vidal.

Proyecto académico — Desarrollo Full Stack II, Duoc UC, 2026.