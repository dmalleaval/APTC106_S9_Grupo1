import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PhoneStatusBar, GestureBar } from "../components/PhoneChrome";
import AppButton from "../components/AppButton";
import Field from "../components/Field";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody, fontUI } from "../theme/typography";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("pedro.ortega@ejemplo.com");
  const [password, setPassword] = useState("12345678");

  return (
    <View style={styles.screen}>
      <PhoneStatusBar />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.brandBlock}>
          <View style={styles.logoRow}>
            <Icon name="scooter" size={36} color={colors.red} />
            <Text style={styles.brand}>FoodPlease</Text>
          </View>
          <Text style={styles.tagline}>Repartidor</Text>
        </View>

        <View style={styles.form}>
          <Field label="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Field label="Contraseña" value={password} onChangeText={setPassword} secure />

          <View style={styles.forgotRow}>
            <Text style={styles.link} onPress={() => navigation.navigate("RecuperarCorreo")}>
              ¿Olvidaste tu contraseña?
            </Text>
          </View>

          <AppButton title="Iniciar sesión" onPress={() => navigation.navigate("Main")} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0 · APK distribución interna</Text>
      </View>
      <GestureBar tone="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  scroll: { flexGrow: 1 },
  brandBlock: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 56,
    paddingHorizontal: 16,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  brand: { fontFamily: fontBody, fontWeight: "900", fontSize: 36, color: colors.red },
  tagline: { fontFamily: fontBody, fontWeight: "600", fontSize: 22, color: colors.muted },
  form: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 16,
  },
  forgotRow: { alignItems: "flex-end" },
  link: { fontFamily: fontUI, fontWeight: "500", fontSize: 14, color: colors.red },
  footer: { backgroundColor: colors.white, alignItems: "center", paddingBottom: 8 },
  footerText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
});
