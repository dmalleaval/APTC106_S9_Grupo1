import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

const HOY = [
  { id: "#1042", nombre: "Sushi Corner", horas: "9:32 — 9:58", precio: "$2.900", propina: "+ $500 propina" },
  { id: "#1041", nombre: "Pizzería Napoli", horas: "8:45 — 9:12", precio: "$3.200", propina: "+ $300 propina" },
  { id: "#1040", nombre: "Café Bistrô", horas: "8:10 — 8:30", precio: "$2.700", propina: null },
  { id: "#1039", nombre: "Burger House", horas: "7:20 — 7:50", precio: "$3.100", propina: "+ $400 propina" },
];

const AYER = [
  {
    id: "#1038",
    nombre: "Empanadas Don Lucho",
    horas: "19:30 — 20:00",
    precio: "$4.500",
    propina: "+ $1.000 propina",
  },
];

const EN_CURSO = [
  { id: "#1847", nombre: "Sushi Nikkei", horas: "1,2 km — ~14 min", precio: "$12.500", status: "En camino", statusColor: colors.teal },
  { id: "#1843", nombre: "Empanadas Don Pepe", horas: "0,8 km — ~8 min", precio: "$8.900", status: "En camino", statusColor: colors.teal },
  { id: "#1850", nombre: "Pizzería Napoli", horas: "2,5 km — ~18 min", precio: "$15.200", status: "Por retirar", statusColor: colors.red },
  { id: "#1851", nombre: "Café Colonia", horas: "3,1 km — ~22 min", precio: "$6.800", status: "Por retirar", statusColor: colors.red },
];

export default function HistorialDePedidosScreen() {
  const [tab, setTab] = useState("completados");

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historial de pedidos</Text>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <View style={styles.chipsRow}>
          <Pressable
            onPress={() => setTab("en-curso")}
            style={[styles.chip, tab === "en-curso" && styles.chipActive]}
          >
            <Text style={[styles.chipText, tab === "en-curso" && styles.chipTextActive]}>En curso</Text>
          </Pressable>
          <Pressable
            onPress={() => setTab("completados")}
            style={[styles.chip, tab === "completados" && styles.chipActive]}
          >
            <Text style={[styles.chipText, tab === "completados" && styles.chipTextActive]}>Completados</Text>
          </Pressable>
        </View>

        {tab === "completados" ? (
          <>
            <Card style={styles.summaryCard}>
              <View style={styles.summaryCol}>
                <Text style={styles.eyebrow}>HOY</Text>
                <Text style={styles.summaryBig}>$21.300</Text>
              </View>
              <View style={styles.vDivider} />
              <View style={[styles.summaryCol, { alignItems: "center" }]}>
                <Text style={styles.eyebrow}>ENTREGAS</Text>
                <Text style={styles.summaryMid}>7 pedidos</Text>
              </View>
              <View style={styles.vDivider} />
              <View style={[styles.summaryCol, { alignItems: "flex-end" }]}>
                <Text style={[styles.eyebrow, { color: colors.teal }]}>PROPINAS</Text>
                <Text style={[styles.summaryMid, { color: colors.teal }]}>+$3.200</Text>
              </View>
            </Card>

            <Text style={styles.dateLabel}>Hoy — Viernes 22 agosto</Text>
            {HOY.map((o) => (
              <OrderRow key={o.id} order={o} />
            ))}

            <Text style={styles.dateLabel}>Ayer — Jueves 21 agosto</Text>
            {AYER.map((o) => (
              <OrderRow key={o.id} order={o} faded />
            ))}
          </>
        ) : (
          <>
            <Text style={styles.dateLabel}>Ahora</Text>
            {EN_CURSO.map((o) => (
              <OrderRow key={o.id} order={o} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function OrderRow({ order, faded }) {
  return (
    <Card style={[styles.orderRow, faded && { opacity: 0.65 }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.orderId}>{order.id}</Text>
        <Text style={styles.orderName}>{order.nombre}</Text>
        <Text style={styles.orderHoras}>{order.horas}</Text>
      </View>
      <View style={styles.orderRight}>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.orderPrecio}>{order.precio}</Text>
          {order.status ? (
            <Text style={[styles.orderStatusText, { color: order.statusColor }]}>{order.status}</Text>
          ) : order.propina ? (
            <Text style={styles.orderPropina}>{order.propina}</Text>
          ) : null}
        </View>
        <View
          style={[
            styles.checkDot,
            order.status && { backgroundColor: order.status === "Por retirar" ? colors.redSoft : colors.tealSoft },
          ]}
        >
          <Icon
            name={order.status ? "clock" : "check"}
            size={12}
            color={order.status ? order.statusColor : colors.teal}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  header: { backgroundColor: colors.dark, minHeight: 56, justifyContent: "center", paddingHorizontal: 16 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  body: { padding: 16, gap: 12 },
  chipsRow: { flexDirection: "row", gap: 8 },
  chip: {
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  chipActive: { backgroundColor: colors.dark, borderColor: colors.dark },
  chipText: { fontFamily: fontBody, fontWeight: "500", fontSize: 14, color: colors.dark },
  chipTextActive: { color: colors.white },
  summaryCard: { flexDirection: "row", alignItems: "center" },
  summaryCol: { flex: 1 },
  vDivider: { width: 1, height: 40, backgroundColor: colors.border2 },
  eyebrow: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
  summaryBig: { fontFamily: fontBody, fontWeight: "700", fontSize: 24, color: colors.dark },
  summaryMid: { fontFamily: fontBody, fontWeight: "600", fontSize: 18, color: colors.dark },
  dateLabel: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted, marginTop: 4 },
  orderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  orderId: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
  orderName: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderHoras: { fontFamily: fontBody, fontSize: 12, color: colors.muted },
  orderRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  orderPrecio: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderPropina: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.teal },
  orderStatusText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12 },
  checkDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.tealSoft,
    alignItems: "center",
    justifyContent: "center",
  },
});
