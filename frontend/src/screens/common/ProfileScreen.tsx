import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../../components/AppButton";
import { AuthContext } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nom</Text>
        <Text style={styles.value}>{auth.fullName}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{auth.email}</Text>
        <Text style={styles.label}>Role</Text>
        <Text style={styles.value}>{auth.role}</Text>
      </View>
      <AppButton title="Deconnexion" variant="danger" onPress={() => void logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  label: {
    color: "#64748b",
    fontSize: 12,
  },
  value: {
    fontWeight: "600",
    color: "#0f172a",
  },
});

