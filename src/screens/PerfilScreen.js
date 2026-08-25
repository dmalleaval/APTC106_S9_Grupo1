import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

const ROWS = [
  { label: "Ganancias de la semana", value: "$96.500" },
  { label: "Vehículo", value: "Moto · GTR-42" },
  { label: "Documentos", badge: "Al día" },
  { label: "Notificaciones", badge: "Activas" },
];

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi perfil</Text>
      </View>
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JV</Text>
          </View>
          <View>
            <Text style={styles.name}>Javier Vargas</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={14} color={colors.red} />
              <Text style={styles.ratingText}>4,9</Text>
              <Text style={styles.deliveries}>312 entregas</Text>
            </View>
          </View>
        </Card>

        <Card style={{ padding: 0 }}>
          {ROWS.map((row, i) => (
            <View
              key={row.label}
              style={[styles.row, i < ROWS.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.rowLabel}>{row.label}</Text>
              {row.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{row.badge}</Text>
                </View>
              ) : (
                <Text style={styles.rowValue}>{row.value}</Text>
              )}
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scrollFlex: { flex: 1 },
  header: { backgroundColor: colors.dark, minHeight: 56, justifyContent: "center", paddingHorizontal: 16 },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.white },
  body: { padding: 16, gap: 16 },
  profileCard: { flexDirection: "row", gap: 16, alignItems: "center" },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fontBody, fontWeight: "700", fontSize: 24, color: colors.white },
  name: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark, marginBottom: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingText: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, color: colors.red },
  deliveries: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border2 },
  rowLabel: { fontFamily: fontBody, fontSize: 16, color: colors.dark },
  rowValue: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  badge: { backgroundColor: colors.teal, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
});
