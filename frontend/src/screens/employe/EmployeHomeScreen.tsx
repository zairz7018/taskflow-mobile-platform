import React, { useCallback, useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppButton from "../../components/AppButton";
import BottomNavBar from "../../components/BottomNavBar";
import TaskCard from "../../components/TaskCard";
import { AuthContext } from "../../context/AuthContext";
import { taskApi } from "../../api/taskApi";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import type { TaskResponse } from "../../types/task";

export default function EmployeHomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { auth, logout } = useContext(AuthContext);
  const [available, setAvailable] = useState<TaskResponse[]>([]);
  const [assigned, setAssigned] = useState<TaskResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setError(null);
    try {
      const [availableData, assignedData] = await Promise.all([
        taskApi.getAvailableTasks(),
        taskApi.getMyAssignedTasks(),
      ]);
      setAvailable(availableData);
      setAssigned(assignedData);
    } catch (err: any) {
      setError(err?.message || "Impossible de charger les taches.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      void loadTasks();
    }, [])
  );

  const preview = assigned.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TaskFlow</Text>
      </View>

      <Text style={styles.greeting}>Bonjour, {auth.fullName}</Text>
      <Text style={styles.subtitle}>Voici un apercu de vos taches</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{available.length}</Text>
          <Text style={styles.summaryLabel}>Disponibles</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{assigned.length}</Text>
          <Text style={styles.summaryLabel}>Assignees</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>
            {assigned.filter((t) => t.status === "EN_COURS").length}
          </Text>
          <Text style={styles.summaryLabel}>En cours</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Actions rapides</Text>
      <View style={styles.actionsRow}>
        <AppButton
          title="Taches disponibles"
          variant="secondary"
          onPress={() => navigation.navigate("AvailableTasks")}
          style={styles.actionButton}
        />
        <AppButton
          title="Mes taches assignees"
          variant="secondary"
          onPress={() => navigation.navigate("MyAssignedTasks")}
          style={styles.actionButton}
        />
        <AppButton
          title="Deconnexion"
          variant="secondary"
          onPress={() => void logout()}
          style={styles.actionButton}
        />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Mes taches en cours</Text>
        <Text style={styles.link} onPress={() => navigation.navigate("MyAssignedTasks")}>
          Voir tout
        </Text>
      </View>

      <View style={styles.listArea}>
        {error && <Text style={styles.error}>{error}</Text>}

        {preview.length === 0 ? (
          <Text style={styles.empty}>Aucune tache assignee.</Text>
        ) : (
          <FlatList
            data={preview}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TaskCard task={item} showStatus showCreatedBy />
            )}
          />
        )}
      </View>

      <BottomNavBar
        activeRoute="EmployeHome"
        items={[
          { label: "Accueil", route: "EmployeHome" },
          { label: "Disponibles", route: "AvailableTasks" },
          { label: "Assignees", route: "MyAssignedTasks" },
          { label: "Profil", route: "Profile" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
    gap: 10,
  },
  header: {
    alignItems: "center",
    paddingVertical: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    color: "#64748b",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1d4ed8",
  },
  summaryLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  link: {
    color: "#1d4ed8",
  },
  error: {
    color: "#b91c1c",
  },
  empty: {
    color: "#94a3b8",
    marginTop: 6,
  },
  listArea: {
    flex: 1,
  },
});
