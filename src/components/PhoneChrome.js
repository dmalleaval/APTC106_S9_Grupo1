import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "./Icon";
import { colors } from "../theme/colors";
import { fontUI } from "../theme/typography";

/**
 * Barra de estado "falsa" (hora + señal + wifi + batería) que replica el
 * diseño de Figma. En un dispositivo real, la barra de estado del sistema
 * operativo ya cumple este rol — esta se mantiene para que la maqueta se vea
 * igual que el diseño tanto en la app como en la vista web de GitHub Pages.
 * Si vas a publicar esto como app real, puedes eliminar <PhoneStatusBar />
 * y usar el componente <StatusBar> nativo de expo-status-bar en su lugar.
 */
export function PhoneStatusBar({ light = false }) {
  const tint = light ? colors.dark2 : colors.white;
  return (
    <View
      style={[
        styles.statusBar,
        { backgroundColor: light ? colors.bg : colors.dark },
      ]}
    >
      <Text style={[styles.time, { color: tint }]}>9:30</Text>
      <View style={styles.icons}>
        <View style={styles.signal}>
          {[5, 8, 11, 15].map((h, i) => (
            <View
              key={i}
              style={[styles.signalBar, { height: h, backgroundColor: tint }]}
            />
          ))}
        </View>
        <Icon name="wifi" size={16} color={tint} />
        <View style={[styles.battery, { borderColor: tint }]}>
          <View style={[styles.batteryFill, { backgroundColor: tint }]} />
        </View>
      </View>
    </View>
  );
}

export function GestureBar({ tone = "white" }) {
  const bg =
    tone === "white" ? colors.white : tone === "bg" ? colors.bg : "rgba(255,255,255,0.85)";
  return (
    <View style={[styles.gestureBar, { backgroundColor: bg }]}>
      <View style={styles.handle} />
    </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  time: {
    fontFamily: fontUI,
    fontWeight: "600",
    fontSize: 14,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  signal: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    height: 15,
  },
  signalBar: {
    width: 3,
    borderRadius: 1,
  },
  battery: {
    width: 20,
    height: 11,
    borderWidth: 1.2,
    borderRadius: 2,
    padding: 1.5,
    justifyContent: "center",
  },
  batteryFill: {
    flex: 1,
    borderRadius: 1,
  },
  gestureBar: {
    height: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    width: 108,
    height: 4,
    borderRadius: 12,
    backgroundColor: colors.dark2,
  },
});
