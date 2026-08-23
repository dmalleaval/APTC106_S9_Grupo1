import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { PhoneStatusBar } from "../../components/PhoneChrome";
import AppButton from "../../components/AppButton";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { colors, radii } from "../../theme/colors";
import { fontBody } from "../../theme/typography";

const PEDIDOS = [
  { id: "#1042", nombre: "Sushi Corner", dir: "Av. Providencia 2140", precio: "$2.900", km: "1,2 km", min: "~14 min" },
  { id: "#1043", nombre: "Pizzería Napoli", dir: "Los Leones 1820", precio: "$3.200", km: "2,4 km", min: "~18 min" },
  { id: "#1044", nombre: "Café Bistrô", dir: null, precio: "$2.700", km: null, min: null },
];

/**
 * Pantalla Home. Los estados "fuera de línea", "snackbar de activación" y
 * "cargando" del diseño original se manejan acá como estado local — tal
 * como se comportaría una pantalla Home real — en vez de ser rutas de
 * navegación separadas. La fila "Modo demo" al final del header es solo
 * para poder mostrar cada estado fácilmente al navegar la maqueta; bórrala
 * si no la necesitas.
 */
export default function PedidosDisponiblesScreen({ navigation }) {
  const [online, setOnline] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleOnline = () => {
    if (online) {
      setOnline(false);
    } else {
      setOnline(true);
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 2500);
    }
  };

  return (
    <View style={styles.screen}>
      <PhoneStatusBar />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JV</Text>
          </View>
          <Text style={styles.headerTitle}>Hola, Javier</Text>
        </View>
        <Pressable
          onPress={handleToggleOnline}
          style={[styles.toggle, !online && styles.toggleOff]}
        >
          <Text style={styles.toggleText}>{online ? "En línea" : "Fuera de línea"}</Text>
          <View style={styles.toggleKnob} />
        </Pressable>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Zona Providencia</Text>
      </View>

      {loading ? (
        <SkeletonBody />
      ) : online ? (
        <OnlineBody navigation={navigation} />
      ) : (
        <OfflineBody onActivate={handleToggleOnline} />
      )}

      {showSnackbar ? (
        <View style={styles.snackbar}>
          <Text style={styles.snackbarText}>¡Estás activo! Ya puedes recibir pedidos.</Text>
          <Pressable onPress={() => setShowSnackbar(false)}>
            <Text style={styles.snackbarAction}>OK</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.devRow}>
        <Text style={styles.devLabel}>Modo demo:</Text>
        <Pressable onPress={() => setLoading((l) => !l)}>
          <Text style={styles.devLink}>{loading ? "Ocultar cargando" : "Ver cargando"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function OnlineBody({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Card dark style={styles.earningsCard}>
        <Text style={styles.eyebrowLight}>GANANCIAS DEL DÍA</Text>
        <Text style={styles.earningsAmount}>$18.400</Text>
        <Text style={styles.earningsSub}>6 entregas completadas</Text>
      </Card>

      <Card style={styles.progressCard}>
        <Text style={styles.eyebrow}>PEDIDOS EN CURSO</Text>
        <View style={styles.progressRow}>
          <View style={styles.progressBox}>
            <View style={styles.progressBoxTop}>
              <View style={[styles.dot, { backgroundColor: colors.teal }]} />
              <Text style={styles.progressNumber}>2</Text>
            </View>
            <Text style={[styles.progressLabel, { color: colors.teal }]}>en reparto</Text>
          </View>
          <View style={styles.progressBox}>
            <View style={styles.progressBoxTop}>
              <View style={[styles.dot, { backgroundColor: colors.red }]} />
              <Text style={styles.progressNumber}>2</Text>
            </View>
            <Text style={[styles.progressLabel, { color: colors.red }]}>por retirar</Text>
          </View>
        </View>
        <AppButton
          title="Ver todos los pedidos"
          variant="red"
          onPress={() => navigation.navigate("PedidosEnCurso")}
        />
      </Card>

      <Text style={styles.sectionTitle}>Pedidos disponibles</Text>

      {PEDIDOS.map((p) => (
        <Card key={p.id} style={[styles.orderCard, p.km ? null : { opacity: 0.6 }]}>
          <View style={styles.orderTop}>
            <Text style={styles.orderId}>{p.id}</Text>
            <Text style={styles.orderPrice}>{p.precio}</Text>
          </View>
          <Text style={styles.orderName}>{p.nombre}</Text>
          {p.dir ? <Text style={styles.orderDir}>{p.dir}</Text> : null}
          {p.km ? (
            <View style={styles.orderMeta}>
              <View style={styles.kmBadge}>
                <Text style={styles.kmBadgeText}>{p.km}</Text>
              </View>
              <Text style={styles.orderDir}>{p.min}</Text>
            </View>
          ) : null}
          <AppButton
            title="Ver detalle"
            variant="pill-outline"
            size="md-sm"
            onPress={() => navigation.navigate("DetalleDelPedido")}
          />
        </Card>
      ))}
    </ScrollView>
  );
}

function OfflineBody({ onActivate }) {
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Card style={styles.offlineEarnings}>
        <Text style={styles.eyebrowLight}>GANANCIAS DEL DÍA (INACTIVO)</Text>
        <Text style={styles.earningsAmount}>$18.400</Text>
        <Text style={styles.earningsSub}>6 entregas completadas</Text>
      </Card>
      <View style={styles.offlineCenter}>
        <View style={styles.offlineIconWrap}>
          <Icon name="motorbike" size={40} color={colors.white} />
        </View>
        <Text style={styles.offlineTitle}>No estás recibiendo pedidos</Text>
        <Text style={styles.offlineSubtitle}>
          Activa tu disponibilidad para comenzar a recibir pedidos cercanos.
        </Text>
      </View>
      <AppButton
        title="Activar disponibilidad"
        variant="teal"
        icon={<Icon name="power" size={18} color={colors.white} />}
        onPress={onActivate}
      />
    </ScrollView>
  );
}

function SkeletonBody() {
  const bar = (w, h = 14) => <View style={[styles.skelBar, { width: w, height: h }]} />;
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={[styles.skelBar, { width: "100%", height: 100, borderRadius: radii.lg }]} />
      {bar(160, 16)}
      {[1, 2, 3].map((i) => (
        <Card key={i} style={{ gap: 12 }}>
          <View style={styles.orderTop}>
            {bar(60, 12)}
            {bar(70)}
          </View>
          {bar(140)}
          {bar(200, 12)}
          <View style={[styles.skelBar, { width: 60, height: 20, borderRadius: 10 }]} />
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, width: "100%", backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.dark,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 12,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontFamily: fontBody, fontWeight: "600", fontSize: 12, color: colors.red },
  headerTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 20, color: colors.white },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.teal,
    paddingLeft: 12,
    paddingRight: 4,
  },
  toggleOff: { backgroundColor: colors.red },
  toggleText: { fontFamily: fontBody, fontWeight: "500", fontSize: 13, color: colors.white },
  toggleKnob: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.white },
  subHeader: { backgroundColor: colors.dark, paddingHorizontal: 16, paddingBottom: 8 },
  subHeaderText: { fontFamily: fontBody, fontSize: 14, color: "rgba(190,196,210,0.8)" },
  body: { padding: 16, gap: 16 },
  eyebrow: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.dark,
  },
  eyebrowLight: {
    fontFamily: fontBody,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
    color: "rgba(255,255,255,0.8)",
  },
  earningsCard: { gap: 4 },
  earningsAmount: { fontFamily: fontBody, fontWeight: "700", fontSize: 36, color: colors.white },
  earningsSub: { fontFamily: fontBody, fontSize: 14, color: "rgba(255,255,255,0.9)" },
  progressCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.red,
    gap: 16,
  },
  progressRow: { flexDirection: "row", gap: 16 },
  progressBox: {
    flex: 1,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border2,
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  progressBoxTop: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  progressNumber: { fontFamily: fontBody, fontWeight: "700", fontSize: 28, color: colors.dark },
  progressLabel: { fontFamily: fontBody, fontWeight: "600", fontSize: 13 },
  sectionTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderCard: { gap: 12 },
  orderTop: { flexDirection: "row", justifyContent: "space-between" },
  orderId: { fontFamily: fontBody, fontWeight: "700", fontSize: 12, color: colors.dark },
  orderPrice: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.red },
  orderName: { fontFamily: fontBody, fontWeight: "600", fontSize: 16, color: colors.dark },
  orderDir: { fontFamily: fontBody, fontSize: 14, color: colors.muted },
  orderMeta: { flexDirection: "row", alignItems: "center", gap: 8 },
  kmBadge: { backgroundColor: colors.red, borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  kmBadgeText: { fontFamily: fontBody, fontWeight: "500", fontSize: 12, color: colors.white },
  offlineEarnings: { backgroundColor: colors.muted, opacity: 0.85, gap: 4 },
  offlineCenter: { alignItems: "center", gap: 16, paddingVertical: 40, paddingHorizontal: 16 },
  offlineIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  offlineTitle: { fontFamily: fontBody, fontWeight: "600", fontSize: 18, color: colors.dark, textAlign: "center" },
  offlineSubtitle: {
    fontFamily: fontBody,
    fontSize: 14,
    lineHeight: 20,
    color: colors.muted,
    textAlign: "center",
  },
  skelBar: { backgroundColor: colors.skeleton, borderRadius: 4 },
  snackbar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 44,
    backgroundColor: "#313033",
    borderRadius: 4,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
  },
  snackbarText: { flex: 1, fontFamily: fontBody, fontSize: 14, color: colors.white },
  snackbarAction: { fontFamily: fontBody, fontWeight: "600", fontSize: 14, color: colors.red },
  devRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    paddingVertical: 6,
    backgroundColor: colors.bg,
  },
  devLabel: { fontFamily: fontBody, fontSize: 11, color: colors.muted },
  devLink: { fontFamily: fontBody, fontSize: 11, color: colors.red, fontWeight: "600" },
});
