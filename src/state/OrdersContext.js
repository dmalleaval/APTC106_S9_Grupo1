import React, { createContext, useContext, useState } from "react";

const AVAILABLE_SEED = [
  { id: "#1042", nombre: "Sushi Corner", dir: "Av. Providencia 2140", precio: "$2.900", km: "1,2 km", min: "~14 min" },
  { id: "#1043", nombre: "Pizzería Napoli", dir: "Los Leones 1820", precio: "$3.200", km: "2,4 km", min: "~18 min" },
  { id: "#1044", nombre: "Café Bistrô", dir: null, precio: "$2.700", km: null, min: null },
];

const POR_RETIRAR_SEED = [
  { id: "#1850", nombre: "Pizzería Napoli", dir: "Manuel Montt 1520", km: "2,5 km", min: "~18 min", precio: "$15.200" },
  { id: "#1851", nombre: "Café Colonia", dir: "Irarrázaval 3250", km: "3,1 km", min: "~22 min", precio: "$6.800" },
];

const OrdersContext = createContext(null);

/**
 * Estado compartido de pedidos entre las pantallas de repartidor. Vive solo
 * en memoria (sin backend todavía) para que "aceptar" en el detalle se
 * refleje de verdad en "Pedidos disponibles" y en "Pedidos en curso", en vez
 * de ser una simulación aislada por pantalla.
 */
export function OrdersProvider({ children }) {
  const [available, setAvailable] = useState(AVAILABLE_SEED);
  const [porRetirar, setPorRetirar] = useState(POR_RETIRAR_SEED);

  const acceptOrder = (order) => {
    setAvailable((list) => list.filter((o) => o.id !== order.id));
    setPorRetirar((list) => [...list, order]);
  };

  const retirarOrder = (id) => {
    setPorRetirar((list) => list.filter((o) => o.id !== id));
  };

  return (
    <OrdersContext.Provider value={{ available, porRetirar, acceptOrder, retirarOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders debe usarse dentro de <OrdersProvider>");
  return ctx;
}
