import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";
import { useOrders } from "../state/OrdersContext";

const EN_REPARTO = [
  { id: "#1847", nombre: "Sushi Nikkei", dir: "Av. Providencia 2124", km: "1,2 km", min: "~14 min", precio: "$12.500", progreso: 65 },
  { id: "#1843", nombre: "Empanadas Don Pepe", dir: "Los Leones 445", km: "0,8 km", min: "~8 min", precio: "$8.900", progreso: 30 },
];

export default function PedidosEnCursoScreen({ navigation }) {
  const { porRetirar } = useOrders();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <AppButton
            title=""
            variant="dark"
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            icon={<Icon name="arrow-left" size={22} color={colors.white} />}
          />
          <Text style={styles.headerTitle}>Pedidos en curso</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{EN_REPARTO.length + porRetirar.length} activos</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Section label="En reparto" color={colors.teal}>
          {EN_REPARTO.map((o) => (
            <Card key={o.id} style={{ gap: 14 }}>
              <View style={styles.rowTop}>
                <Text style={styles.orderId}>Pedido {o.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.tealSoft }]}>
                  <Text style={[styles.statusText, { color: colors.teal }]}>En camino</Text>
                </View>
              </View>
              <View>
                <Text style={styles.orderName}>{o.nombre}</Text>
                <Text style={styles.orderDir}>{o.dir}</Text>
              </View>
              <View style={styles.rowTop}>
                <View style={styles.metaRow}>
                  <View style={styles.kmBadge}>
                    <Text style={styles.kmBadgeText}>{o.km}</Text>
                  </View>
                  <Text style={styles.orderDir}>{o.min}</Text>
                </View>
                <Text style={styles.orderPrice}>{o.precio}</Text>
              </View>
              <View>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>Progreso de entrega</Text>
                  <Text style={[styles.progressLabel, { color: colors.teal, fontWeight: "600" }]}>
                    {o.progreso}%
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${o.progreso}%` }]} />
                </View>
              </View>
              <AppButton title="Entregar" size="sm" onPress={() => navigation.navigate("ConfirmarEntrega")} />
            </Card>
          ))}
        </Section>

        <Section label="Por retirar" color={colors.red}>
          {porRetirar.length === 0 ? (
            <Text style={styles.emptyText}>No tienes pedidos pendientes de retiro.</Text>
          ) : null}
          {porRetirar.map((o) => (
            <Card key={o.id} style={{ gap: 14 }}>
              <View style={styles.rowTop}>
                <Text style={styles.orderId}>Pedido {o.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: colors.redSoft }]}>
                  <Text style={[styles.statusText, { color: colors.red }]}>Aceptado</Text>
                </View>
              </View>
              <View>
                <Text style={styles.orderName}>{o.nombre}</Text>
                <Text style={styles.orderDir}>{o.dir}</Text>
              </View>
              <View style={styles.rowTop}>
                <View style={styles.metaRow}>
                  <View style={styles.kmBadge}>
                    <Text style={styles.kmBadgeText}>{o.km}</Text>
                  </View>
                  <Text style={styles.orderDir}>{o.min}</Text>
                </View>
                <Text style={styles.orderPrice}>{o.precio}</Text>
              </View>
              <AppButton
                title="Ir al local"
                size="sm"
                onPress={() => navigation.navigate("NavegacionGps", { id: o.id, nombre: o.nombre })}
              />
            </Card>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ label, color, children }) {
  return (
    <View style={{ gap: 12 }}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionDot, { backgroundColor: color }]} />
        <Text style={styles.sectionLabel}>{label}</Text>
      </View>
      <View style={{ gap: 12 }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  header: {
    backgroundColor: colors.dark,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  countBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  countBadgeText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12, color: colors.white },
  body: { padding: 16, gap: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  sectionDot: { width: 8, height: 8, borderRadius: 4 },
  sectionLabel: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    color: colors.muted,
    textTransform: "uppercase",
  },
  rowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { fontFamily: fontBody, fontWeight: "700", fontSize: 16, color: colors.dark },
  statusBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12 },
  orderName: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderDir: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  kmBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  kmBadgeText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
  orderPrice: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.red },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  progressLabel: { fontFamily: fontBody, fontSize: 11, color: colors.muted },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: "#e1e5ed", overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: colors.teal },
  emptyText: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
});
