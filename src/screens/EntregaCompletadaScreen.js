import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PhoneStatusBar, GestureBar } from "../components/PhoneChrome";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function EntregaCompletadaScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <PhoneStatusBar light />
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Icon name="check" size={48} color={colors.white} />
        </View>
        <View style={styles.textGroup}>
          <Text style={styles.title}>¡Entrega completada!</Text>
          <Text style={styles.subtitle}>Pedido #1042 · 9:58</Text>
        </View>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ganancia del pedido</Text>
            <Text style={styles.summaryPositive}>+ $2.900</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total del día</Text>
            <Text style={styles.summaryTotalValue}>$21.300</Text>
          </View>
        </Card>
      </View>
      <View style={styles.actions}>
        <AppButton title="Buscar nuevo pedido" onPress={() => navigation.navigate("Main")} />
      </View>
      <GestureBar tone="bg" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  content: { flex: 1, alignItems: "center", paddingTop: 80, paddingHorizontal: 16, gap: 24 },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.teal,
    alignItems: "center",
    justifyContent: "center",
  },
  textGroup: { alignItems: "center", gap: 8 },
  title: { fontFamily: fontBody, fontWeight: "700", fontSize: 24, color: colors.dark },
  subtitle: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  summaryCard: { width: "100%", gap: 16 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { fontFamily: fontBody, fontSize: 16, color: colors.muted },
  summaryPositive: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.teal },
  divider: { height: 1, backgroundColor: colors.border2 },
  summaryTotalLabel: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  summaryTotalValue: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.dark },
  actions: { padding: 16, paddingBottom: 8 },
});
