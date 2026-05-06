import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppButton from "../../components/AppButton";
import Loading from "../../components/Loading";
import { taskApi } from "../../api/taskApi";
import type { TaskResponse } from "../../types/task";
import TaskCard from "../../components/TaskCard";
import BottomNavBar from "../../components/BottomNavBar";

export default function AvailableTasksScreen() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadTasks = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const data = await taskApi.getAvailableTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err?.message || "Impossible de charger les taches.");
    } finally {
      setLoading(false);
    }
  };

  const handleTake = async (id: number) => {
    setError(null);
    setMessage(null);
    try {
      await taskApi.takeTask(id);
      setMessage("Tache prise avec succes.");
      await loadTasks();
    } catch (err: any) {
      setError(err?.message || "Echec de prise en charge.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      void loadTasks();
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taches disponibles</Text>
      <AppButton title="Rafraichir" variant="secondary" onPress={() => void loadTasks()} />

      {error && <Text style={styles.error}>{error}</Text>}
      {message && <Text style={styles.success}>{message}</Text>}

      <View style={styles.listArea}>
        {tasks.length === 0 ? (
          <Text style={styles.empty}>Aucune tache disponible.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                showStatus={false}
                showCreatedBy
                actions={
                  <AppButton
                    title="Prendre la tache"
                    onPress={() => void handleTake(item.id)}
                  />
                }
              />
            )}
          />
        )}
      </View>

      <BottomNavBar
        activeRoute="AvailableTasks"
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
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },
  error: {
    color: "#b91c1c",
  },
  success: {
    color: "#16a34a",
  },
  empty: {
    color: "#94a3b8",
  },
  listArea: {
    flex: 1,
  },
});
