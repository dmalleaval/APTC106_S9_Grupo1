# APTC106_S9_Grupo1

Repositorio correspondiente a sección APTC106 Grupo 3 Aplicativo móvil FoodPlease

## Integrantes

- Isabel Vera
- Gabriel Vera
- Diego Mallea

# FoodPlease · Repartidor — maqueta en React Native + Expo

Aplicación Móvil para el perfil de repartidor en donde podra realizar recibir pedidos, navegar via GPS, actualziar estados de pedidos y confirmación de entregas. Adicional podra visualizar los pedidos realizados, en curso y los montos asociados.

Maqueta navegable construida con **React Native + Expo** (JavaScript), usando **React Navigation** para la navegación entre pantallas.

## Requisitos

- Node.js 18 o superior
- npm (o yarn/pnpm)
- La app [Expo Go](https://expo.dev/go) en tu celular, si quieres probarla en un dispositivo real (opcional — también corre en el navegador)

## Instalación

```bash
npm install
```

```bash
npx expo install --check
```

## Correrlo

```bash
npx expo start        # abre el menú de Expo (QR para celular, o presiona 'w' para abrir en el navegador)
npx expo start --web  # abre directo en el navegador
```

## Estructura del proyecto

```
App.js                        → entry point: NavigationContainer + linking
src/
  theme/                       → colores, tipografía (tokens del diseño Figma)
  components/                  → Icon, AppButton, Field, Card, TopAppBar,
                                  BottomNavBar, PhoneChrome (barra de estado
                                  y barra de gestos "falsas" que replican el
                                  diseño — ver nota abajo)
  navigation/
    RootNavigator.js            → Stack principal (login, recuperar clave,
                                   flujo de un pedido, etc.)
    MainTabs.js                 → Bottom Tabs (Pedidos, Mapa, Historial, Perfil)
    linking.js                  → mapea cada pantalla a una URL, para que
                                   funcione bien en la versión web
  screens/                      → una carpeta/archivo por pantalla
assets/images/                  → 3 imágenes de marcador de posición
                                   (ver nota abajo)
```

### Pantallas incluidas (16 rutas de navegación)

Bienvenida, Login, Recuperar contraseña (correo → código → nueva contraseña), Contraseña actualizada, **Main** (Tabs: Pedidos disponibles, Mapa de pedidos, Historial de pedidos, Perfil), Detalle del pedido, Navegación GPS, Actualizar estado, Confirmar entrega, Entrega completada, Pedidos en curso.

Las 3 vistas "secundarias" del diseño original (fuera de línea, snackbar de activación, cargando/skeleton) **no son rutas separadas** — se manejan como estado local dentro de la pantalla Home (`src/screens/home/PedidosDisponiblesScreen.js`), tal como funcionaría una pantalla real. Esa pantalla tiene una fila "Modo demo" al final para poder mostrar el estado de carga fácilmente; bórrala cuando ya no la necesites.
