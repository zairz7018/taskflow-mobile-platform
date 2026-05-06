import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { TaskPriority } from "../types/task";

const priorityColors: Record<TaskPriority, { bg: string; text: string }> = {
  BASSE: { bg: "#e2e8f0", text: "#334155" },
  MOYENNE: { bg: "#fde68a", text: "#92400e" },
  HAUTE: { bg: "#fecaca", text: "#991b1b" },
  URGENTE: { bg: "#fca5a5", text: "#7f1d1d" },
};

export default function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const colors = priorityColors[priority];
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{priority}</Text>
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
