import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading({ label = "Chargement..." }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1d4ed8" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f1f5f9",
  },
  text: {
    color: "#475569",
  },
});
