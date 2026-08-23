import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PhoneStatusBar, GestureBar } from "../components/PhoneChrome";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

const STEPS = [
  { title: "Pedido aceptado", meta: "9:32", state: "done" },
  { title: "Llegué al local", meta: "9:40", state: "done" },
  { title: "Pedido retirado", meta: "Por confirmar", state: "current" },
  { title: "En camino al cliente", meta: null, state: "pending" },
  { title: "Entregado", meta: null, state: "pending" },
];

export default function ActualizarEstadoScreen({ navigation }) {
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
        <Text style={styles.headerTitle}>Estado del pedido</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {STEPS.map((step, i) => (
          <View key={step.title} style={styles.stepRow}>
            <View style={styles.stepMarkerCol}>
              <StepDot state={step.state} />
              {i < STEPS.length - 1 ? (
                <View
                  style={[
                    styles.stepLine,
                    { backgroundColor: step.state === "done" ? colors.teal : colors.border },
                  ]}
                />
              ) : null}
            </View>
            <View style={styles.stepText}>
              <Text
                style={[
                  styles.stepTitle,
                  step.state === "pending" && { color: colors.muted },
                  step.state === "current" && { fontWeight: "700" },
                ]}
              >
                {step.title}
              </Text>
              {step.meta ? (
                <Text
                  style={[
                    styles.stepMeta,
                    step.state === "current" && { color: colors.red, fontWeight: "500" },
                  ]}
                >
                  {step.meta}
                </Text>
              ) : null}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.actions}>
        <AppButton title='Marcar "Pedido retirado"' onPress={() => navigation.navigate("ConfirmarEntrega")} />
      </View>
      <GestureBar tone="bg" />
    </View>
  );
}

function StepDot({ state }) {
  if (state === "done") {
    return (
      <View style={[styles.dot, { backgroundColor: colors.teal }]}>
        <Icon name="check" size={14} color={colors.white} />
      </View>
    );
  }
  if (state === "current") {
    return (
      <View style={[styles.dot, { borderWidth: 2, borderColor: colors.red, backgroundColor: colors.white }]}>
        <View style={styles.dotInner} />
      </View>
    );
  }
  return <View style={[styles.dot, { borderWidth: 2, borderColor: colors.border, backgroundColor: colors.white }]} />;
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
  body: { padding: 24 },
  stepRow: { flexDirection: "row", gap: 16 },
  stepMarkerCol: { alignItems: "center", width: 24 },
  dot: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  dotInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.red },
  stepLine: { width: 2, flex: 1, minHeight: 24 },
  stepText: { paddingBottom: 32, flex: 1 },
  stepTitle: { fontFamily: fontBody, fontWeight: "500", fontSize: 16, color: colors.dark },
  stepMeta: { fontFamily: fontBody, fontSize: 12, color: colors.muted, marginTop: 2 },
  actions: { padding: 16, backgroundColor: colors.white },
});
