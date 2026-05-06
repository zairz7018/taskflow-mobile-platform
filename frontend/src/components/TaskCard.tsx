import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { TaskResponse } from "../types/task";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

interface TaskCardProps {
  task: TaskResponse;
  showStatus?: boolean;
  showAssignedTo?: boolean;
  showCreatedBy?: boolean;
  actions?: React.ReactNode;
}

export default function TaskCard({
  task,
  showStatus = true,
  showAssignedTo,
  showCreatedBy,
  actions,
}: TaskCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      {task.description ? <Text style={styles.text}>{task.description}</Text> : null}

      <View style={styles.badgeRow}>
        {showStatus ? <StatusBadge status={task.status} /> : null}
        <PriorityBadge priority={task.priority} />
      </View>

      {task.deadline ? <Text style={styles.meta}>Echeance: {task.deadline}</Text> : null}
      {showAssignedTo && task.assignedToName ? (
        <Text style={styles.meta}>Assigne a: {task.assignedToName}</Text>
      ) : null}
      {showCreatedBy && task.createdByName ? (
        <Text style={styles.meta}>Client: {task.createdByName}</Text>
      ) : null}

      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
  },
  text: {
    color: "#475569",
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  meta: {
    color: "#64748b",
    fontSize: 12,
  },
  actions: {
    marginTop: 6,
    gap: 8,
  },
});

