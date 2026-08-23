# APTC106_S9_Grupo1
Repositorio correspondiente a sección APTC106 Grupo 3 Aplicativo móvil FoodPlease

## Integrantes

- Isabel Vera
- Gabriel Vera
- Diego Mallea

## Descripción del proyecto

Aplicación Móvil para el perfil de repartidor en donde podra realizar recibir pedidos, navegar via GPS, actualziar estados de pedidos y confirmación de entregas. Adicional podra visualizar los pedidos realizados, en curso y los montos asociados.

## Estructura

```
index.html            → shell de la app + las 19 pantallas (<section class="screen">)
assets/css/styles.css → sistema de diseño (colores, tipografía, componentes)
assets/js/script.js   → navegación entre pantallas, selector de pantallas, toggles
verify.py             → script opcional (Playwright) para tomar capturas de cada pantalla

Cada pantalla es un `<section class="screen" data-screen="nombre-de-pantalla">`. La navegación entre ellas se hace con atributos `data-goto="nombre-de-pantalla"` en cualquier botón o link — `script.js` intercepta el click y cambia la pantalla activa. También hay un selector ("Ir a pantalla") en la barra superior del prototipo para saltar directo a cualquiera de las 19, útil para revisar estados que no forman parte del flujo principal (skeleton loading, snackbar, etc).

## Pantallas incluidas

Bienvenida, Login, Recuperar contraseña (correo / código / nueva contraseña), Contraseña actualizada, Pedidos disponibles, Pedidos fuera de línea, Home con snackbar activo, Home con skeleton loading, Detalle del pedido, Navegación GPS, Actualizar estado, Confirmar entrega, Entrega completada, Perfil, Historial de pedidos, Pedidos en curso, Mapa de pedidos.

## Cómo verlo localmente

Solo abre `index.html` en el navegador (no necesita servidor ni instalación). Si prefieres servirlo:
