import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { TaskStatus } from "../types/task";

const statusColors: Record<TaskStatus, { bg: string; text: string }> = {
  EN_ATTENTE: { bg: "#fde68a", text: "#92400e" },
  PRISE_EN_CHARGE: { bg: "#bfdbfe", text: "#1e3a8a" },
  EN_COURS: { bg: "#c7d2fe", text: "#312e81" },
  TERMINEE: { bg: "#bbf7d0", text: "#166534" },
  ANNULEE: { bg: "#fecaca", text: "#991b1b" },
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const colors = statusColors[status];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
