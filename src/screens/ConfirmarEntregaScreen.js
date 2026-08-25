import React, { useState } from "react";
import { View, Text, TextInput, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import Card from "../components/Card";
import AppButton from "../components/AppButton";
import Icon from "../components/Icon";
import { colors } from "../theme/colors";
import { fontBody } from "../theme/typography";

export default function ConfirmarEntregaScreen({ navigation }) {
  const [photo, setPhoto] = useState(null);
  const [note, setNote] = useState("");

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6 });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
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
      <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.body}>
        <Card outline style={styles.codeCard}>
          <Text style={styles.eyebrow}>CÓDIGO DEL CLIENTE</Text>
          <Text style={styles.code}>4 7 2 9</Text>
        </Card>
        <Pressable style={styles.photoBox} onPress={handleTakePhoto}>
          {photo ? (
            <>
              <Image source={{ uri: photo }} style={styles.photoPreview} />
              <Text style={styles.photoText}>Toca para tomar otra foto</Text>
            </>
          ) : (
            <>
              <Icon name="camera" size={32} color={colors.muted} />
              <Text style={styles.photoText}>Adjuntar foto de comprobante</Text>
            </>
          )}
        </Pressable>
        <View style={styles.noteBox}>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Nota opcional (ej: dejado en conserjería)"
            placeholderTextColor={colors.muted}
            multiline
            style={styles.noteInput}
          />
        </View>
      </ScrollView>
      <View style={styles.actions}>
        <AppButton
          title="Confirmar entrega"
          variant="teal"
          onPress={() => navigation.navigate("EntregaCompletada")}
        />
      </View>
    </SafeAreaView>
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
  photoPreview: { width: "100%", height: 160, borderRadius: 8 },
  noteBox: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 },
  noteInput: { fontFamily: fontBody, fontSize: 14, color: colors.dark, minHeight: 40, textAlignVertical: "top" },
  actions: { padding: 16, backgroundColor: colors.white },
});
