import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PhoneStatusBar, GestureBar } from "../components/PhoneChrome";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function DetalleDelPedidoScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <PhoneStatusBar />
      <View style={styles.header}>
        <AppButton
          title=""
          variant="dark"
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          icon={<Icon name="arrow-left" size={22} color={colors.white} />}
        />
        <Text style={styles.headerTitle}>Pedido #1042</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Card outline style={styles.row}>
          <View style={[styles.iconWrap, { backgroundColor: colors.redSoft }]}>
            <Icon name="store" size={20} color={colors.red} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.eyebrow, { color: colors.red }]}>RETIRO EN LOCAL</Text>
            <Text style={styles.rowTitle}>Sushi Corner</Text>
            <Text style={styles.rowSubtitle}>Av. Providencia 2140, local 3</Text>
          </View>
        </Card>
        <Card outline style={styles.row}>
          <View style={[styles.iconWrap, { backgroundColor: colors.tealSoft }]}>
            <Icon name="user" size={20} color={colors.teal} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.eyebrow, { color: colors.teal }]}>ENTREGA AL CLIENTE</Text>
            <Text style={styles.rowTitle}>María González</Text>
            <Text style={styles.rowSubtitle}>Los Leones 1455, Depto 802</Text>
          </View>
        </Card>
        <Card dark style={styles.summaryRow}>
          <View>
            <Text style={styles.eyebrowLight}>DISTANCIA TOTAL</Text>
            <Text style={styles.summaryValue}>3,1 km</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.eyebrowLight}>PAGO DEL REPARTO</Text>
            <Text style={styles.summaryValue}>$2.900</Text>
          </View>
        </Card>
      </ScrollView>
      <View style={styles.actions}>
        <AppButton
          title="Rechazar"
          variant="outline"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("Main")}
        />
        <AppButton
          title="Aceptar pedido"
          style={{ flex: 1 }}
          onPress={() => navigation.navigate("NavegacionGps")}
        />
      </View>
      <GestureBar tone="bg" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.dark,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  body: { padding: 16, gap: 16 },
  row: { flexDirection: "row", gap: 16 },
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  eyebrow: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, marginBottom: 4 },
  eyebrowLight: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 4,
  },
  rowTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark, marginBottom: 2 },
  rowSubtitle: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryValue: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.white },
  actions: { flexDirection: "row", gap: 16, padding: 16, backgroundColor: colors.white },
});
