import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { PhoneStatusBar, GestureBar } from "../components/PhoneChrome";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function NavegacionGpsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <PhoneStatusBar />
      <ImageBackground
        source={require("../../assets/images/map-navegacion.png")}
        style={styles.map}
        imageStyle={styles.mapImage}
      >
        <View style={styles.topCard}>
          <Card style={styles.topCardInner}>
            <View style={styles.originDot} />
            <View style={{ flex: 1 }}>
              <Text style={styles.metaLabel}>Hacia el local</Text>
              <Text style={styles.metaTitle}>Sushi Corner</Text>
            </View>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>1,2 km — 6 min</Text>
            </View>
          </Card>
        </View>

        <View style={styles.bottomArea}>
          <Card style={styles.maneuverCard}>
            <View style={styles.turnIcon}>
              <Icon name="arrow-up-right" size={24} color={colors.white} />
            </View>
            <View>
              <Text style={styles.maneuverTitle}>Siga por Av. Providencia</Text>
              <Text style={styles.maneuverTitle}>450 m</Text>
            </View>
          </Card>
          <AppButton title="Llegué al local" onPress={() => navigation.navigate("ActualizarEstado")} />
        </View>
      </ImageBackground>
      <GestureBar tone="translucent" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: "#e1e5ed" },
  map: { flex: 1, width: "100%", height: "100%", justifyContent: "space-between" },
  mapImage: { width: "100%", height: "100%", resizeMode: "cover" },
  topCard: { padding: 16 },
  topCardInner: { flexDirection: "row", alignItems: "center", gap: 12 },
  originDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.dark },
  metaLabel: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.muted },
  metaTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  distanceBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  distanceText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
  bottomArea: { padding: 16, gap: 16 },
  maneuverCard: { flexDirection: "row", alignItems: "center", gap: 16 },
  turnIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  maneuverTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
});
