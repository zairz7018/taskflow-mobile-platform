import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppButton from "../../components/AppButton";
import Loading from "../../components/Loading";
import { taskApi } from "../../api/taskApi";
import type { TaskResponse } from "../../types/task";
import TaskCard from "../../components/TaskCard";
import BottomNavBar from "../../components/BottomNavBar";

export default function MyTasksScreen() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await taskApi.getMyTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err?.message || "Impossible de charger les taches.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      await loadTasks();
    } catch (err: any) {
      setError(err?.message || "Suppression echouee.");
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
      <Text style={styles.title}>Mes taches</Text>
      <AppButton title="Rafraichir" variant="secondary" onPress={() => void loadTasks()} />

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.listArea}>
        {tasks.length === 0 ? (
          <Text style={styles.empty}>Aucune tache pour le moment.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                showAssignedTo
                actions={
                  item.status === "EN_ATTENTE" ? (
                    <AppButton
                      title="Supprimer"
                      variant="danger"
                      onPress={() => void handleDelete(item.id)}
                    />
                  ) : null
                }
              />
            )}
          />
        )}
      </View>

      <BottomNavBar
        activeRoute="MyTasks"
        items={[
          { label: "Accueil", route: "ClientHome" },
          { label: "Mes taches", route: "MyTasks" },
          { label: "Creer", route: "CreateTask" },
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
  empty: {
    color: "#94a3b8",
  },
  listArea: {
    flex: 1,
  },
});
