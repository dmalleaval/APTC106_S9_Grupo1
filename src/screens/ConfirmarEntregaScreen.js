import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PhoneStatusBar, GestureBar } from "../components/PhoneChrome";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function ConfirmarEntregaScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Confirmar entrega</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Card outline style={styles.codeCard}>
          <Text style={styles.eyebrow}>CÓDIGO DEL CLIENTE</Text>
          <Text style={styles.code}>4 7 2 9</Text>
        </Card>
        <View style={styles.photoBox}>
          <Icon name="camera" size={32} color={colors.muted} />
          <Text style={styles.photoText}>Adjuntar foto de comprobante</Text>
        </View>
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>Nota opcional (ej: dejado en conserjería)</Text>
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <AppButton
          title="Confirmar entrega"
          variant="teal"
          onPress={() => navigation.navigate("EntregaCompletada")}
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
  codeCard: { alignItems: "center", gap: 12 },
  eyebrow: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, color: colors.muted },
  code: { fontFamily: fontBody, fontWeight: "700", fontSize: 36, letterSpacing: 6, color: colors.dark },
  photoBox: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  photoText: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  noteBox: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 },
  noteText: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  actions: { padding: 16, backgroundColor: colors.white },
});
